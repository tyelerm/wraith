import { Button } from "@/components/ui/button";
import React from "react";
import DailogForm from "../DialogForm";
import CreateForm from "./CreateForm";

export default function CreateUser() {
    return (
        <DailogForm
            id="create-trigger"
            title="Create User"
            Trigger={<Button variant="outline">Search</Button>}
            form={<CreateForm />}
        />
    );
}
