"use client";
import { CardWrapper } from "@/components/auth/Card-wrapper";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { register } from "@/action/register";
import { FormError } from "@/components/Form-error";
import { FormSuccess } from "@/components/Form-success";

export default function RegisterForm() {
  const [ispending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await register(values);
      setError(data.error);
      // Success redirects, so no need to set success; uncomment this line if you want to show a success message instead of redirecting
      // setSuccess(data.success);
    });
  };

  return (
    <CardWrapper
      headerlabel="Create an account"
      backbuttonlabel="Already have an account?"
      backbuttonref="/auth/login"
      showsocial
    >
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <Field>
          <FieldGroup>
            <Controller
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <>
                  <FieldLabel>Fullname</FieldLabel>
                  <Input
                    {...field}
                    placeholder="John doe"
                    disabled={ispending}
                  />
                  <FieldError>
                    {form.formState.errors.fullname?.message}
                  </FieldError>
                </>
              )}
            ></Controller>
          </FieldGroup>
        </Field>
        <Field>
          <FieldGroup>
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    placeholder="email@example.com"
                    type="email"
                    disabled={ispending}
                  />
                  <FieldError>
                    {form.formState.errors.email?.message}
                  </FieldError>
                </>
              )}
            ></Controller>
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
                  <Input
                    {...field}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="off"
                    disabled={ispending}
                  />
                  <FieldError>
                    {form.formState.errors.password?.message}
                  </FieldError>
                </>
              )}
            ></Controller>
          </FieldGroup>
        </Field>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button className="w-full" type="submit" disabled={ispending}>
          Register
        </Button>
      </form>
    </CardWrapper>
  );
}
