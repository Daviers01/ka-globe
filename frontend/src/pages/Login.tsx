import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: FormData) {
    setServerError(null);
    try {
      const res = await api.post('/api/auth/login', data);
      const token = res.data?.token;
      if (token) {
        login(token);
        navigate('/tasks');
      }
    } catch (e: unknown) {
      const error = e as { response?: { data?: { error?: string } } };
      setServerError(error?.response?.data?.error || 'Login failed');
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md shadow">
        <CardTitle>Welcome back</CardTitle>
        <CardDescription className="mb-4">Sign in to continue to Ka Globe</CardDescription>

        {serverError && <Alert className="mb-4">{serverError}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register('email')} aria-invalid={!!formState.errors.email} />
            {formState.errors.email && (
              <p className="text-sm text-red-600">{formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                aria-invalid={!!formState.errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-2 text-sm text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {formState.errors.password && (
              <p className="text-sm text-red-600">{formState.errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="form-checkbox" /> <span>Remember me</span>
            </label>
            <Link to="#" className="text-sm text-blue-600">
              Forgot password?
            </Link>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-4">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-600">
            Create one
          </Link>
        </p>
      </Card>
    </div>
  );
}
