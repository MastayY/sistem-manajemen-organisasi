import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import AuthLayout from '@/layouts/auth-layout';
import { Eye, EyeClosed, Key, KeyIcon, Lock, User } from 'lucide-react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!data.email || !data.password) {
            return setErrorMessage('Email dan password harus diisi');
        }
        if (!data.email.includes('@')) {
            return setErrorMessage('Format email tidak valid');
        }

        post(route('login'), {
            onSuccess: () => reset('password'),
            onError: () => setErrorMessage('Email atau password salah'),
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-[Inter]">
            <Head title="Log in" />


            {/* Form Container */}
            <div className="bg-white px-4 py-8 shadow-lg sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:px-10">
                {/* Header */}
                <div className="mb-8 text-center sm:mx-auto sm:w-full sm:max-w-md">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Cakra Wijaya</h1>
                    <h2 className="text-xl font-semibold text-gray-700">Login Dashboard Anggota</h2>
                    <p className="mt-2 text-sm text-gray-600">Masuk ke dashboard anggota Karang Taruna</p>
                </div>
                <form className="space-y-6" onSubmit={submit}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <User className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="block w-full appearance-none rounded-md border border-gray-300 py-2 pr-3 pl-10 placeholder-gray-400 focus:border-red-500 focus:ring-red-500 focus:outline-none sm:text-sm"
                                placeholder="Masukkan email Anda"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="block w-full appearance-none rounded-md border border-gray-300 py-2 pr-10 pl-10 placeholder-gray-400 focus:border-red-500 focus:ring-red-500 focus:outline-none sm:text-sm"
                                placeholder="Masukkan password Anda"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                                    {showPassword ? (
                                        <EyeClosed className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="animate-fadeIn rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{errorMessage}</div>
                    )}

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center">
                                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white"></span>
                                    Memproses...
                                </span>
                            ) : (
                                'Masuk'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500">
                <p>&copy; 2025 Karang Taruna Cakra Wijaya. All rights reserved.</p>
            </div>
        </div>
    );
}
