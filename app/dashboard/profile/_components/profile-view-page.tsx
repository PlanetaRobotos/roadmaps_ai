'use client';

import React, { useContext, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { LogOut, Mail, Check, X } from 'lucide-react';
import { AuthContext } from '@/context/auth-context';
import axios from '@/lib/axios';
import { capitalize } from '@/utils/shared';
import { API_BASE_URL } from '@/config/apiConfig';
import { useRouter } from 'next/navigation';

export default function ProfileViewPage() {
  const router = useRouter();

  const { user, logout } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedName, setEditedName] = useState(capitalize(user?.name) || '');
  const [editedBio, setEditedBio] = useState(user?.bio || '');

  const handleVerifyEmail = async () => {
    setIsLoading(true);
    try {
      const redirectLinkResp = await axios.post(
        `${API_BASE_URL}/v1/auth/send-magic-link`,
        {
          userId: user?.id
        }
      );

      const email = redirectLinkResp.data;
      router.push(`/verify-request?email=${user?.email}&search=${email}`);
    } catch (error) {
      console.error('Error verifying email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await axios.put(`v1/users/${user?.id}`, {
        name: editedName,
        bio: editedBio
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-4 md:max-w-2xl md:py-8">
      <Card className="border-0 md:border">
        <CardHeader className="space-y-1 px-0 md:px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl md:text-2xl">Profile</CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to logout?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You will need to log in again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-0 md:px-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Avatar className="h-24 w-24 rounded-lg md:h-20 md:w-20">
              <AvatarFallback className="rounded-lg text-lg">
                {(user?.name || user.email?.split('@')[0] || '')
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="w-full space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-medium">{capitalize(user?.name)}</h3>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                {user?.emailConfirmed ? (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" /> Verified
                  </Badge>
                ) : (
                  <div className="flex flex-col items-center gap-2 sm:flex-row">
                    <Badge
                      variant="destructive"
                      className="flex items-center gap-1"
                    >
                      <X className="h-3 w-3" /> Unverified
                    </Badge>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleVerifyEmail}
                      disabled={isLoading}
                      className="w-full sm:w-auto"
                    >
                      Verify Email
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                disabled={!isEditing || isLoading}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                disabled={!isEditing || isLoading}
                placeholder="Tell us about yourself..."
                className="w-full resize-none"
                rows={4}
              />
            </div>

            <div className="flex flex-col justify-end gap-2 sm:flex-row">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedName(
                        user?.name || user.email?.split('@')[0] || ''
                      );
                      setEditedBio(user?.bio || '');
                    }}
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
