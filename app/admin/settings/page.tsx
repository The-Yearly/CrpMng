"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Bell,
  Leaf,
  Shield,
  Globe,
  Save,
  AlertTriangle,
} from "lucide-react";

/* ---------------- Animation System ---------------- */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function SettingsPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-zinc-50 p-10"
    >
      <div className="mx-auto max-w-6xl space-y-12">

        {/* Header */}
        <motion.div variants={item}>
          <h1 className="text-3xl font-semibold text-slate-900">
            Settings
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Configure your account, farm data, notifications, and security
            preferences.
          </p>
        </motion.div>

        <Section icon={User} title="Account Information">
          <Grid>
            <Field label="Farmer / Organization Name" />
            <Field label="Email Address" type="email" />
            <Field label="Phone Number" />
            <Field label="Location" />
          </Grid>
        </Section>

        <Section icon={Leaf} title="Farm Configuration">
          <Grid>
            <Field label="Primary Crop" />
            <Field label="Total Land Area (acres)" type="number" />
            <Field label="Irrigation Method" />
            <Field label="Soil Type" />
          </Grid>
        </Section>

        <Section icon={Bell} title="Notifications">
          <Toggle
            label="Weather Alerts"
            description="Rainfall, storms, and severe conditions"
          />
          <Toggle
            label="Pest & Disease Warnings"
            description="Early detection alerts"
          />
          <Toggle
            label="Expert Advisory Updates"
            description="Government & agronomy guidance"
          />
        </Section>

        <Section icon={Globe} title="Preferences">
          <Grid>
            <Field label="Language" />
            <Field label="Measurement Units" />
          </Grid>
        </Section>

        <Section icon={Shield} title="Security">
          <Grid>
            <Field label="New Password" type="password" />
            <Field label="Confirm Password" type="password" />
          </Grid>
        </Section>

        {/* Danger Zone */}
        <motion.div variants={item}>
          <Card className="rounded-2xl border border-red-200 bg-red-50/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-slate-600">
                Permanently delete your account and all associated farm data.
              </p>
              <Button variant="destructive">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Action */}
        <motion.div variants={item} className="flex justify-end pt-8">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Button
              size="lg"
              className="gap-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Save size={18} />
              Save Changes
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
}

/* ---------------- Reusable UI Blocks ---------------- */

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={item} whileHover={{ y: -2 }}>
      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-900">
            <Icon className="h-5 w-5 text-emerald-600" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {children}
    </div>
  );
}

function Field({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-slate-700">{label}</Label>
      <Input className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" type={type} />
    </div>
  );
}

function Toggle({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
    >
      <div>
        <p className="font-medium text-slate-800">{label}</p>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <Switch />
    </motion.div>
  );
}
