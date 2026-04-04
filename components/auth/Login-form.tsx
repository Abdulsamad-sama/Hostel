"use client";

import * as z from "zod";

import { CardWrapper } from "@/components/auth/Card-wrapper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "../ui/button";

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log("Form values:", values);
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
                      type="password"
                      placeholder="••••••••"
                      autoComplete="off"
                      {...field}
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

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </CardWrapper>
  );
}
