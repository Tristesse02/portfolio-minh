"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function TestimonialModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!name || !message) {
      setError("Name and message are required.");
      return;
    }

    if (message.length > 500) {
      setError("Message too long. Keep it under 500 characters.");
      return;
    }

    const stored = localStorage.getItem("testimonialAuthorized");
    if (!stored) {
      setError("You are not authorized.");
      return;
    }

    const parsed = JSON.parse(stored);
    const email = parsed.email;

    setLoading(true);

    const res = await fetch("/api/save-testimonial", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        role,
        company,
        message,
      }),
    });

    const result = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setName("");
      setRole("");
      setCompany("");
      setMessage("");
    } else {
      setError(result.error || "Submission failed.");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-white/10" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                  Submit a Testimonial
                </Dialog.Title>

                <div className="mt-2 space-y-4">
                  <input
                    className="w-full rounded border px-3 py-2 dark:bg-zinc-800 dark:text-white"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="w-full rounded border px-3 py-2 dark:bg-zinc-800 dark:text-white"
                    placeholder="Your Role (e.g Software Engineer)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <input
                    className="w-full rounded border px-3 py-2 dark:bg-zinc-800 dark:text-white"
                    placeholder="Your Company (e.g Google)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <textarea
                    className="w-full rounded border px-3 py-2 dark:bg-zinc-800 dark:text-white"
                    placeholder="Your Testimonial"
                    value={message}
                    rows={4}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  {success && (
                    <p className="text-green-500 text-sm">
                      ✅ Submitted! Thanks for your time 😊
                    </p>
                  )}
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    className="px-4 py-2 rounded bg-gray-300 dark:bg-zinc-700"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    className="px-4 py-2 rounded bg-blue-600 text-white"
                    onClick={handleSubmit}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
