import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { login } = useAuth();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  async function onSubmit(data: FormData) {
    setServerError(null);
    try {
      const res = await api.post('/api/auth/register', data);
      const token = res.data?.token;
      if (token) login(token);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Register failed';
      setServerError(message);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md shadow">
        <CardTitle>Create your account</CardTitle>
        <CardDescription className="mb-4">Start managing tasks in seconds.</CardDescription>

        {serverError && <Alert className="mb-4">{serverError}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full name (optional)</Label>
            <Input id="name" {...register('name')} />
          </div>

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
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {formState.errors.password && (
              <p className="text-sm text-red-600">{formState.errors.password.message}</p>
            )}
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          </div>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
