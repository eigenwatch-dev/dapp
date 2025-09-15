/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@radix-ui/react-select";
import { SelectContent } from "@/components/ui/select";
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  Shield,
  Activity,
  Users,
  Database,
  Home,
  BarChart3,
  AlertTriangle,
  Moon,
  Sun,
} from "lucide-react";
import { useOperators } from "@/hooks/crud/useOperatorRisk";

// Mock data based on your API structure
const columnHelper = createColumnHelper<any>();

// Utility functions
const formatStake = (stake: string) => {
  const num = parseFloat(stake);
  if (num >= 1e24) return `${(num / 1e24).toFixed(2)}Y`;
  if (num >= 1e21) return `${(num / 1e21).toFixed(2)}Z`;
  if (num >= 1e18) return `${(num / 1e18).toFixed(2)}E`;
  if (num >= 1e15) return `${(num / 1e15).toFixed(2)}P`;
  return `${num.toFixed(2)}`;
};

const getRiskBadgeColor = (level: string) => {
  switch (level) {
    case "LOW":
      return "bg-green-900/30 text-green-400 border-green-800";
    case "MEDIUM":
      return "bg-yellow-900/30 text-yellow-400 border-yellow-800";
    case "HIGH":
      return "bg-red-900/30 text-red-400 border-red-800";
    case "CRITICAL":
      return "bg-red-900/50 text-red-300 border-red-700";
    default:
      return "bg-gray-800 text-gray-400 border-gray-700";
  }
};

const getRiskIcon = (level: string) => {
  switch (level) {
    case "LOW":
      return "🛡️";
    case "MEDIUM":
      return "📊";
    case "HIGH":
      return "⚠️";
    case "CRITICAL":
      return "🚨";
    default:
      return "➖";
  }
};

// Sidebar Component
const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const [activeItem, setActiveItem] = useState("operators");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "operators", label: "Operators", icon: Shield },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "monitoring", label: "Monitoring", icon: Activity },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
    { id: "users", label: "Users", icon: Users },
    { id: "database", label: "Database", icon: Database },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:z-0 w-64`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">RiskMonitor</span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    activeItem === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

// Navbar Component
const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [isDark, setIsDark] = useState(true);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search operators..."
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 w-80"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDark(!isDark)}
            className="text-gray-400 hover:text-white"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

const OperatorsTable = () => {
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [riskLevelFilter, setRiskLevelFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data } = useOperators();
  const operators = data?.operators || [];
  const mockOperators = operators;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const columns = useMemo(
    () => [
      columnHelper.accessor("operator_id", {
        header: "Operator ID",
        cell: ({ getValue }) => {
          const id = getValue();
          return (
            <div className="font-mono text-xs text-gray-300">
              {id.slice(0, 6)}...{id.slice(-4)}
            </div>
          );
        },
      }),
      columnHelper.accessor("risk_score", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 h-auto font-semibold text-gray-300 hover:text-white"
          >
            Risk Score
            {column.getIsSorted() === "asc"
              ? " ↑"
              : column.getIsSorted() === "desc"
              ? " ↓"
              : " ↕"}
          </Button>
        ),
        cell: ({ getValue }) => {
          const score = getValue();
          return (
            <div className="flex items-center space-x-2">
              <div className="font-semibold text-white">{score.toFixed(1)}</div>
              <div
                className={`w-16 h-2 rounded-full ${
                  score >= 70
                    ? "bg-red-900"
                    : score >= 50
                    ? "bg-yellow-900"
                    : "bg-green-900"
                }`}
              >
                <div
                  className={`h-full rounded-full ${
                    score >= 70
                      ? "bg-red-500"
                      : score >= 50
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor("risk_level", {
        header: "Risk Level",
        cell: ({ getValue }) => {
          const level = getValue();
          return (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskBadgeColor(
                level
              )}`}
            >
              <span>{getRiskIcon(level)}</span>
              {level}
            </span>
          );
        },
      }),
      columnHelper.accessor("confidence_score", {
        header: "Confidence",
        cell: ({ getValue }) => (
          <div className="text-center text-gray-300">{getValue()}%</div>
        ),
      }),
      columnHelper.accessor("total_stake", {
        header: "Total Stake",
        cell: ({ getValue }) => (
          <div className="font-mono text-sm text-gray-300">
            {formatStake(getValue())}
          </div>
        ),
      }),
      columnHelper.accessor("delegator_count", {
        header: "Delegators",
        cell: ({ getValue }) => (
          <div className="text-center text-gray-300">{getValue()}</div>
        ),
      }),
      columnHelper.accessor("delegation_volatility_30d", {
        header: "Volatility 30d",
        cell: ({ getValue }) => {
          const volatility = getValue();
          return (
            <div className="flex items-center space-x-1">
              <span
                className={`text-xs ${
                  volatility > 2
                    ? "text-red-400"
                    : volatility > 1
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {volatility > 2 ? "📈" : volatility > 1 ? "📊" : "📉"}
              </span>
              <span className="text-sm text-gray-300">
                {volatility.toFixed(2)}
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("is_active", {
        header: "Status",
        cell: ({ getValue }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              getValue()
                ? "bg-green-900/30 text-green-400 border border-green-800"
                : "bg-gray-800 text-gray-400 border border-gray-700"
            }`}
          >
            {getValue() ? "Active" : "Inactive"}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedOperator(row.original.operator_id)}
              className="text-blue-400 hover:text-blue-300"
            >
              👁 View
            </Button>
          </div>
        ),
      }),
    ],
    []
  );

  const filteredData = useMemo(() => {
    return mockOperators.filter(
      (operator: { risk_level: string; operator_id: string }) => {
        const matchesRiskLevel =
          riskLevelFilter === "all" || operator.risk_level === riskLevelFilter;
        const matchesSearch =
          searchTerm === "" ||
          operator.operator_id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesRiskLevel && matchesSearch;
      }
    );
  }, [mockOperators, riskLevelFilter, searchTerm]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={toggleSidebar} />

          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Operator Risk Assessment
                  </h1>
                  <p className="text-gray-400 mt-1">
                    Monitor and analyze operator risk metrics across the network
                  </p>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      Total Operators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {mockOperators.length}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      High Risk
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-400">
                      {
                        mockOperators.filter(
                          (op: { risk_level: string }) =>
                            op.risk_level === "HIGH"
                        ).length
                      }
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      Average Risk Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {(
                        mockOperators.reduce(
                          (sum: any, op: { risk_score: any }) =>
                            sum + op.risk_score,
                          0
                        ) / mockOperators.length
                      ).toFixed(1)}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      Active Operators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">
                      {
                        mockOperators.filter(
                          (op: { is_active: any }) => op.is_active
                        ).length
                      }
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-300">
                      🔍 Filters:
                    </span>
                  </div>
                  <Input
                    placeholder="Search operator ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Select
                    value={riskLevelFilter}
                    onValueChange={setRiskLevelFilter}
                  >
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="LOW">Low Risk</SelectItem>
                      <SelectItem value="MEDIUM">Medium Risk</SelectItem>
                      <SelectItem value="HIGH">High Risk</SelectItem>
                      <SelectItem value="CRITICAL">Critical Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Table */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                  <div className="overflow-hidden rounded-lg border border-gray-800">
                    <table className="w-full border-collapse">
                      <thead className="bg-gray-800">
                        {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <th
                                key={header.id}
                                className="border-b border-gray-700 px-4 py-3 text-left text-sm font-medium text-gray-300"
                              >
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody className="bg-gray-900">
                        {table.getRowModel().rows?.length ? (
                          table.getRowModel().rows.map((row) => (
                            <tr
                              key={row.id}
                              className="hover:bg-gray-800 transition-colors border-b border-gray-800"
                            >
                              {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-3 text-sm">
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={columns.length}
                              className="h-24 text-center text-gray-500"
                            >
                              No results found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Pagination */}
              <div className="flex items-center justify-between bg-gray-900 border border-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-300">
                    Rows per page
                  </p>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}
                  >
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center justify-center text-sm font-medium text-gray-300">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                      className="text-sm bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                    >
                      First
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="text-sm bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="text-sm bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                    >
                      Next
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      disabled={!table.getCanNextPage()}
                      className="text-sm bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                    >
                      Last
                    </Button>
                  </div>
                </div>
              </div>

              {/* Operator Details Modal/Panel */}
              {selectedOperator && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-white">
                        Operator Details
                      </h2>
                      <Button
                        onClick={() => setSelectedOperator(null)}
                        variant="outline"
                        className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                      >
                        Close
                      </Button>
                    </div>
                    <OperatorDetailsView operatorId={selectedOperator} />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// Operator Details Component
const OperatorDetailsView = ({ operatorId }: { operatorId: string }) => {
  const { data } = useOperators();
  const operators = data?.operators || [];
  const mockOperators = operators;
  const operator = mockOperators.find(
    (op: { operator_id: string }) => op.operator_id === operatorId
  );

  if (!operator) return <div className="text-gray-400">Operator not found</div>;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-sm text-gray-400">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {operator.risk_score.toFixed(1)}
            </div>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskBadgeColor(
                operator.risk_level
              )}`}
            >
              {getRiskIcon(operator.risk_level)} {operator.risk_level}
            </span>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-sm text-gray-400">Total Stake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-white">
              {formatStake(operator.total_stake)}
            </div>
            <div className="text-sm text-gray-400">
              {operator.delegator_count} delegators
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-sm text-gray-400">Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {operator.confidence_score}%
            </div>
            <div className="text-sm text-gray-400">
              {operator.has_sufficient_data
                ? "Sufficient data"
                : "Limited data"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component Scores */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Risk Component Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">
                  Performance
                </span>
                <span className="text-sm text-gray-300">
                  {operator.performance_score.toFixed(1)}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${operator.performance_score}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">
                  Economic
                </span>
                <span className="text-sm text-gray-300">
                  {operator.economic_score.toFixed(1)}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${operator.economic_score}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">
                  Network Position
                </span>
                <span className="text-sm text-gray-300">
                  {operator.network_position_score.toFixed(1)}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${operator.network_position_score}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operational Metrics */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Operational Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-white">
                {operator.operational_days}
              </div>
              <div className="text-sm text-gray-400">Days Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {operator.avs_count}
              </div>
              <div className="text-sm text-gray-400">AVS Count</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {operator.slashing_events}
              </div>
              <div className="text-sm text-gray-400">Slashing Events</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {operator.delegation_volatility_30d.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">30d Volatility</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperatorsTable;
