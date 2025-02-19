import React, { useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_EditActionButtons,
  MRT_Row,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Workout } from "./workouts";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteWorkout } from "../../../hooks/useDeleteWorkout";
import { useGetUsers } from "../../../hooks/useGetUsers";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useUpdateWorkout } from "../../../hooks/useUpdateWorkout";
import { useCreateWorkout } from "../../../hooks/useCreateWorkout";

interface WorkoutProps {
  data: Workout[];
}

const WorkoutModel: React.FC<WorkoutProps> = ({ data }) => {
  const { mutateAsync: deleteWorkout, isPending: isDeletingUser } =
    useDeleteWorkout();
  const {
    data: fetchedWorkout = [],
    isError: isLoadingWorkoutError,
    isFetching: isFetchingWorkout,
    isLoading: isLoadingWorkout,
  } = useGetUsers();

  //call CREATE hook
  const { mutateAsync: createWorkout, isPending: isCreatingUser } =
    useCreateWorkout();

  //CREATE action
  const handleCreateWorkout: MRT_TableOptions<Workout>["onCreatingRowSave"] =
    async ({ values, table }) => {
      await createWorkout(values);
      table.setCreatingRow(null); //exit creating mode
    };

  //call UPDATE hook
  const { mutateAsync: updateWorkout, isPending: isUpdatingUser } =
    useUpdateWorkout();
  //should be memoized or stable
  const openDeleteConfirmModal = (row: MRT_Row<Workout>) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteWorkout(row.original._id ?? "");
    }
  };
  //UPDATE action
  const handleSaveWorkout: MRT_TableOptions<Workout>["onEditingRowSave"] =
    async ({ values, table }) => {
      console.log(values);
      await updateWorkout(values);
      table.setEditingRow(null); //exit editing mode
    };
  const columns = useMemo<MRT_ColumnDef<Workout>[]>(
    () => [
      {
        accessorKey: "_id", //normal accessorKey
        header: "ID",
        size: 200,
      },
      {
        accessorKey: "updatedAt", //access nested data with dot notation
        header: "Date",
        size: 150,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          if (typeof value === "string" || value instanceof Date) {
            const utcDate = new Date(value);
            const localDate = utcDate.toLocaleString(); // Converts UTC to local time
            return <>{localDate}</>;
          }
          return null; // Return null if the value is not a valid date
        },
      },
      {
        accessorKey: "type",
        header: "Workout",
        size: 150,
      },
      {
        accessorKey: "duration", //normal accessorKey
        header: "Duration(In minutes)",
        size: 200,
      },
      {
        accessorKey: "caloriesBurned",
        header: "Calories Burned(In cal)",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,

    enableEditing: true,

    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => {
      // Create a copy of the row's data for editing

      return (
        <>
          <DialogTitle variant="h6" className="text-center">
            workout
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {internalEditComponents}{" "}
            {/* or render custom edit components here */}
          </DialogContent>
          <DialogActions>
            <MRT_EditActionButtons variant="text" table={table} row={row} />
          </DialogActions>
        </>
      );
    },
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Workout</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    data: fetchedWorkout, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    onEditingRowSave: handleSaveWorkout,
    onCreatingRowSave: handleCreateWorkout,
    getRowId: (row) => row._id ?? "",
    initialState: { columnVisibility: { _id: false } },
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        className="rounded-lg"
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        + Add Workout
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default WorkoutModel;
