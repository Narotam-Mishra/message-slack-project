
import Workspace from "../schema/workspace.js";
import crudRepository from "./crudRepository.js";

const workspaceRepository = {
    ...crudRepository(Workspace),

    getWorkspaceByName: async function() {
        console.log("Repo code");
    },

    getWorkspaceByJoinCode: async function() {

    },

    addMemberToWorkspace: async function(){

    },

    addChannelToWorkspace: async function(){

    },

    fetchAllWorkspaceByMemberId: async function(){

    }
};

export default workspaceRepository;