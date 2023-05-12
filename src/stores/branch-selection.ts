import { defineStore } from "pinia";

interface BranchSelectionState {
  selectedBranches: { name: string }[];
}

export const useBranchSelectionStore = defineStore({
  id: "branch-selection",
  state: (): BranchSelectionState => ({
    selectedBranches: [],
  }),
  getters: {
    getSelectedBranches(state) {
      return state.selectedBranches;
    },
  },
  actions: {
    addSelectedBranch(branch: { name: string }) {
      this.selectedBranches.push(branch);
    },
  },
});
