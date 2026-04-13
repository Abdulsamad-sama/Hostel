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
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setSuccess("Login successful!");
        router.push("/");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper
      header="Welcome Back"
      headerlabel="Please sign in to your account"
      backbuttonlabel="Don't have an account?"
      backbuttonref="/auth/register"
      showsocial
    >
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </CardWrapper>
  );
}
