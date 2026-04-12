"use client";

import { CardWrapper } from "@/components/auth/Card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/Form-error";
import { FormSuccess } from "@/components/Form-success";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { login } from "@/action/login";
import { useState, useTransition } from "react";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await login(values);
      setError(data.error);
      // Success redirects, so no need to set success; uncomment this line if you want to show a success message instead of redirecting
      // setSuccess(data.success);
    });
  };

  return (
    <CardWrapper
      headerlabel="Welcome Back"
      backbuttonlabel="Don't have an account?"
      backbuttonref="/auth/register"
      showsocial
    >
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <Field>
          <FieldGroup>
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FieldLabel>Email</FieldLabel>
                  <InputGroup>
                    <Input
                      placeholder="email@example.com"
                      {...field}
                      type="email"
                      disabled={isPending}
                    />
                  </InputGroup>

                  <FieldError>
                    {form.formState.errors.email?.message}
                  </FieldError>
                </>
              )}
            />
          </FieldGroup>
        </Field>
        <Field>
          <FieldGroup>
            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <>
                  <FieldLabel>Password</FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      autoComplete="off"
                      disabled={isPending}
                    />
                  </InputGroup>
                  <FieldError>
                    {form.formState.errors.password?.message}
                  </FieldError>
                </>
              )}
            />
          </FieldGroup>
        </Field>

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          Login
        </Button>
      </form>
    </CardWrapper>
  );
}
