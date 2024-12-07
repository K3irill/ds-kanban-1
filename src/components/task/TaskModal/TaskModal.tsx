import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import useTaskStore from '@/store/taskStore';

const TaskModal = () => {
  const { isModal, setIsModal } = useTaskStore();

  return (
    <Dialog open={isModal} onClose={() => setIsModal(false)}>
      <div>
        <div>
          <DialogPanel transition>
            <DialogTitle as="h3">Payment successful</DialogTitle>
            <p>
              Your payment has been successfully submitted. We’ve sent you an email with all of the
              details of your order.
            </p>
            <div className="mt-4">
              <button type="button" onClick={() => setIsModal(false)}>
                Got it, thanks!
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default TaskModal;
