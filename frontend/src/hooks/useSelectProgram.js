import { useAuthContext } from "./useAuthContext";
import { useCallback, useEffect } from "react";


export const useSelectProgram = () => {
    const { user, dispatch } = useAuthContext();

    const selectProgram = useCallback((program) => {
        // Assuming user.user.programs is an array
        const updatedUser = { ...user, user: { ...user.user, selectedProgram: program } };

        // Dispatch the updated user with the selected program
        dispatch({ type: 'LOGIN', payload: updatedUser });
    }, [user, dispatch]);

    // Set the initial selectedProgram to the first program if it's not already set
    useEffect(() => {
        if (user && user.user && user.user.programs && !user.user.selectedProgram) {
            const firstProgram = user.user.programs[0];
            if (firstProgram) {
                selectProgram(firstProgram.name);
            }
        }
    }, [user, selectProgram]);

    return { selectProgram };
};
