
import { StatusCodes } from "http-status-codes";

import User from "../schema/user.js";
import Workspace from "../schema/workspace.js";
import ClientError from "../utils/errors/clientError.js";
import crudRepository from "./crudRepository.js";

const workspaceRepository = {
    ...crudRepository(Workspace),

    getWorkspaceByName: async function(workspaceName) {
        const workspace = await Workspace.findOne({
            name : workspaceName
        });

        // if no workspace exist then throw error
        if(!workspace){
            throw new ClientError({
                explanation : "Invalid data sent from the client",
                message: "Workspace not found",
                statusCode: StatusCodes.NOT_FOUND
            })
        }
        
        // otherwise return workspace
        return workspace;
    },

    getWorkspaceByJoinCode: async function(joinCode) {
        const workspace = await Workspace.findOne({
            joinCode
        });

        // if no workspace exist then throw error
        if(!workspace){
            throw new ClientError({
                explanation : "Invalid data sent from the client",
                message: "Workspace not found",
                statusCode: StatusCodes.NOT_FOUND
            })
        }
        
        // otherwise return workspace
        return workspace;
    },

    addMemberToWorkspace: async function(workspaceId, memberId, role){
        const workspace = await Workspace.findById(workspaceId);

        // if no workspace exist then throw error
        if(!workspace){
            throw new ClientError({
                explanation : "Invalid data sent from the client",
                message: "Workspace not found",
                statusCode: StatusCodes.NOT_FOUND
            })
        }

        const isValidUser = await User.findById(memberId);
        if(!isValidUser){
            throw new ClientError({
                explanation : "Invalid data sent from the client",
                message: "User not found",
                statusCode: StatusCodes.NOT_FOUND
            })
        }

        // check if member already exists in workspace
        const isMemberAlreadyPartOfWorkspace = workspace.members.find((member) => member.memberId === memberId);
        
        if(isMemberAlreadyPartOfWorkspace){
            throw new ClientError({
                explanation : "Invalid data sent from the client",
                message: "User already part of workspace",
                statusCode: StatusCodes.FORBIDDEN
            })
        }

        workspace.members.push({
            memberId,
            role
        });

        // save to DB
        await workspace.save();
        
        // return the workspace
        return workspace;
    },

    addChannelToWorkspace: async function(){

    },

    fetchAllWorkspaceByMemberId: async function(){

    }
};

export default workspaceRepository;