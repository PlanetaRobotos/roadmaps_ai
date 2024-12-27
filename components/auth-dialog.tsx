'use client';

import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { AuthContext } from '@/context/auth-context';

const AuthDialog: React.FC = () => {
  const { isAuthDialogOpen, closeAuthDialog, handleLogin, handleSignUp } =
    useContext(AuthContext);

  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={closeAuthDialog}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Authentication Required</DialogTitle>
          <DialogDescription>
            Please log in or sign up to perform this action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col justify-end space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Button onClick={handleLogin} className="w-full sm:w-auto">
            Login
          </Button>
          <Button
            onClick={handleSignUp}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Sign Up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
