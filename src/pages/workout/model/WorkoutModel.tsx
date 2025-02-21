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
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteWorkout } from "../../../hooks/useDeleteWorkout";
import { useGetUsers } from "../../../hooks/useGetUsers";
import { useUpdateWorkout } from "../../../hooks/useUpdateWorkout";
import { useCreateWorkout } from "../../../hooks/useCreateWorkout";
import { validateWorkout } from "../../../utils/validation";

interface WorkoutProps {
  data: Workout[];
}

const WorkoutModel: React.FC<WorkoutProps> = () => {
  const { mutateAsync: deleteWorkout } = useDeleteWorkout();
  const { data: fetchedWorkout = [], refetch } = useGetUsers();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const handleRefersh = async () => {
    await refetch();
  };
  //call CREATE hook
  const { mutateAsync: createWorkout } = useCreateWorkout();

  //CREATE action
  const handleCreateWorkout: MRT_TableOptions<Workout>["onCreatingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateWorkout(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }

      setValidationErrors({});
      await createWorkout(values);
      table.setCreatingRow(null); //exit creating mode
    };

  //call UPDATE hook
  const { mutateAsync: updateWorkout } = useUpdateWorkout();
  //should be memoized or stable
  const openDeleteConfirmModal = (row: MRT_Row<Workout>) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteWorkout(row.original._id ?? "");
    }
  };
  //UPDATE action
  const handleSaveWorkout: MRT_TableOptions<Workout>["onEditingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateWorkout(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await updateWorkout(values);
      table.setEditingRow(null); //exit editing mode
    };
  const columns = useMemo<MRT_ColumnDef<Workout>[]>(
    () => [
      {
        accessorKey: "_id", //normal accessorKey
        header: "ID",
        muiEditTextFieldProps: {
          disabled: true,
          hidden: true,
        },
        size: 200,
      },
      {
        accessorKey: "updatedAt", //access nested data with dot notation
        header: "Date",
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.updatedAt,
          helperText: validationErrors?.updatedAt,
          //remove any previous validation errors when user focuses on the input
        },
        Cell: ({ cell }) => {
          const value = cell.getValue();
          if (typeof value === "string" || value instanceof Date) {
            const utcDate = new Date(value);
            const localDate = utcDate.toLocaleString().split(",")[0]; // Converts UTC to local time

            return <>{localDate}</>;
          }
          return null; // Return null if the value is not a valid date
        },
      },
      {
        accessorKey: "type",
        header: "Workout",
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.type,
          helperText: validationErrors?.type,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              type: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "duration", //normal accessorKey
        header: "Duration(In minutes)",
        size: 200,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.duration,
          helperText: validationErrors?.duration,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              duration: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "caloriesBurned",
        header: "Calories Burned(In cal)",
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.caloriesBurned,
          helperText: validationErrors?.caloriesBurned,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              caloriesBurned: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
    ],
    [validationErrors]
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
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
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
      <>
        <Tooltip title="Refresh Data">
          <IconButton color="primary" onClick={handleRefersh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
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
      </>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default WorkoutModel;
