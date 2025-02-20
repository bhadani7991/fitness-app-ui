import { Box, Button, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import CreateGoalDialogBox from "./model/CreateGoalDialogBox";
import GoalModal from "./model/GoalModal";
import GoalProgressModel from "./model/GoalProgressModel";

const Goal = () => {
  const [activeTab, setActiveTab] = useState<number>(0); // Tracks the active tab
  const [isGoalCreateModalOpen, setIsGoalCreateModalOpen] =
    useState<boolean>(false);

  const handleTabChange = (event: any, newTabValue: number) => {
    setActiveTab(newTabValue);
  };
  return (
    <div>
      <h1 className="text-4xl">Achieve your best</h1>
      <h4>Stay on target with a weekly goal</h4>
      <hr />

      {/* Tabs for Goal Details and Progress */}
      <Box className="my-4">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Goal management tabs"
          className="w-full"
        >
          <Tab label="Goal Details" />
          <Tab label="Progress" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box className="p-2">
        {/* Tab 1: Goal Details and Adding Goal */}
        {activeTab === 0 && (
          <div>
            <div className="mb-4">
              <Button
                variant="contained"
                onClick={() => setIsGoalCreateModalOpen(!isGoalCreateModalOpen)}
              >
                UPDATE ACTIVE GOAL
              </Button>

              {isGoalCreateModalOpen && (
                <CreateGoalDialogBox
                  isOpen={isGoalCreateModalOpen}
                  onClose={() => setIsGoalCreateModalOpen(false)}
                />
              )}
            </div>
            <GoalModal />
          </div>
        )}

        {/* Tab 2: Progress */}
        {activeTab === 1 && (
          <div>
            <GoalProgressModel />
            {/* Add your component for displaying progress here */}
          </div>
        )}
      </Box>
    </div>
  );
};

export default Goal;
