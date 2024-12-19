import React from "react";
import { AccountForm } from "./_components/account-form";
import { Separator } from "@/components/ui/separator";
import { PasswordForm } from "./_components/password-form";
import { DangerZone } from "./_components/danger-zone";

export default function SettingsPage() {
    return (
        <div className="container max-w-2xl space-y-8 p-4">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
            </div>

            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold mb-2">Account</h2>
                    <p className="text-sm text-zinc-400 mb-6">
                        Here, you can update your account information such as
                        your profile picture, name and username.
                    </p>
                    <AccountForm />
                </section>

                <Separator className="bg-zinc-800" />

                <section>
                    <h2 className="text-xl font-semibold mb-2">Security</h2>
                    <p className="text-sm text-zinc-400 mb-6">
                        In this section, you can change your password and
                        enable/disable two-factor authentication.
                    </p>
                    <PasswordForm />
                </section>

               

                <section>
                    <h2 className="text-xl font-semibold text-red-500  mb-2">
                        Danger Zone
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                        In this section, you can delete your account and all the
                        data associated to your user, but please keep in mind
                        that this action is irreversible.
                    </p>
                    <DangerZone />
                </section>
            </div>
        </div>
    );
}
