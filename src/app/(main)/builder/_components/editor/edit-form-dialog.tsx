import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { PencilSimple, Plus } from '@phosphor-icons/react';
import React, { ReactNode } from 'react';

interface FormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  index: number | null;
  form: any;
  onSubmit: (data: any) => void; // Adjust the type as per your form data structure
  children: ReactNode;
}

const FormDialog: React.FC<FormDialogProps> = ({ open, setOpen, index, form, onSubmit, children }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[600px] border-secondary bg-black">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center space-x-4">
              <div className="flex size-5 items-center justify-center">
                {index !== null ? <PencilSimple size={100}  /> : <Plus size={100}  />}
              </div>
              <h3 className="w-[220px] text-xl truncate font-medium lg:w-[320px]">
                {index !== null ? "Update an existing item" : "Create a new item"}
              </h3>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {children}
            <DialogFooter>
              <Button type="submit" className="rounded-[2px]">
                {index !== null ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;