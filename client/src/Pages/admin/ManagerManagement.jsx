import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ShieldCheck, UserCog } from "lucide-react";

const managers = [
  { id: 1, name: "Hansi Kodamulla", email: "hansi@shopco.com", status: "Active", role: "Super Admin" },
  { id: 2, name: "Adithya Semina", email: "adithya@shopco.com", status: "Active", role: "Manager" },
];

export default function ManagerManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manager Management</h2>
          <p className="text-muted-foreground">Manage and assign roles to your staff.</p>
        </div>
        <Button className="rounded-full shadow-lg bg-indigo-600 hover:bg-indigo-700">
          <UserCog className="mr-2 h-4 w-4" /> Add New Manager
        </Button>
      </div>

      <Card className="rounded-[24px] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
          <CardDescription>A list of all registered managers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b-0 hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {managers.map((manager) => (
                <TableRow key={manager.id} className="group hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {manager.name.charAt(0)}
                    </div>
                    {manager.name}
                  </TableCell>
                  <TableCell className="text-slate-500">{manager.email}</TableCell>
                  <TableCell>
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
                      {manager.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs">
                      <ShieldCheck className="w-4 h-4" /> {manager.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}