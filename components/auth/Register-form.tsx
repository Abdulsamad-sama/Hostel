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
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FormError } from "@/components/Form-error";
import { FormSuccess } from "@/components/Form-success";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: values.fullname,
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setSuccess("Registration successful!");
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
      header="Create an account"
      headerlabel="Create an account to get started"
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Register"}
        </Button>
      </form>
    </CardWrapper>
  );
}
