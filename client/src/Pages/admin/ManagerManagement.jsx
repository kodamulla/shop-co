import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, PlusSignIcon, MoreHorizontalCircle01Icon } from "@hugeicons/core-free-icons";

export default function ManagerManagement() {
  const [managers, setManagers] = useState([]);

  // පසුව අපි මෙතනට Backend එකෙන් Data ගන්න Axios function එක ලියනවා.

  return (
    <div className="flex flex-col gap-6 w-full">
      <Card className="shadow-sm border-muted">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight">Manager Management</CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your system administrators and store managers. Add, update, or remove access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Toolbar: Search & Add Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-80">
              <HugeiconsIcon 
                icon={Search01Icon} 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" 
              />
              <Input
                type="search"
                placeholder="Search managers..."
                className="pl-9 bg-muted/50 border-transparent focus-visible:bg-transparent"
              />
            </div>
            <Button className="w-full sm:w-auto shadow-sm">
              <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
              Add New Manager
            </Button>
          </div>

          {/* Data Table */}
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* අපි මේක තාවකාලිකව දාන්නේ. ඊළඟට DB එකෙන් Data එන විදියට හදමු */}
                <TableRow className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium text-foreground">Hansi Kodamulla</TableCell>
                  <TableCell className="text-muted-foreground">hansi@shopco.com</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      Admin
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-600">
                      Active
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <HugeiconsIcon icon={MoreHorizontalCircle01Icon} className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}