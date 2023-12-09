import React from "react";
import DailogForm from "../DialogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import EditForm from "./EditorForm";

export default function EditUser() {
    return (
        <DailogForm
            id="update-trigger"
            title="Edit User"
            Trigger={
                <Button variant="outline">
                    <Pencil1Icon />
                    Edit
                </Button>
            }
            form={<EditForm />}
        />
    );
}
