import { ListEntityView } from "@/components/shared/ListEntityView";
import { TableColumnConfig } from "@/components/shared/table/ReuseableTable";
import operatorData from "./dummy_data.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OperatorPage() {
  const operatorsColumns: TableColumnConfig[] = [
    // { key: "operator_id", displayName: "Operator ID" },
    // { key: "operator_address", displayName: "Operator Address" },
    { key: "operator", displayName: "Operator" },
    // { key: "is_active", displayName: "Active" },
    { key: "risk_level", displayName: "Risk Level" },
    { key: "risk_score", displayName: "Risk Score" },
    { key: "active_avs_count", displayName: "Active AVS" },
    // { key: "total_tvs", displayName: "Total TVS" },
    { key: "delegator_count", displayName: "Delegator Count" },
    { key: "operational_days", displayName: "Operational Days" },
    // { key: "current_pi_commission_bips", displayName: "PI Commission (BIPS)" },
    // { key: "total_slash_events", displayName: "Slash Events" },
  ];

  return (
    <ListEntityView
      entity="Operators"
      searchPlaceholder="Search operators by name, ID, or address..."
      tableConfig={{
        columns: operatorsColumns,
        data: operatorData.map((operator) => ({
          ...operator,
          risk_level: (
            <button
              className={
                "flex py-[3px] w-[75px] rounded-[8px] " +
                (operator.risk_level.toLowerCase() === "medium"
                  ? "bg-[#162456]/20"
                  : operator.risk_level.toLowerCase() === "high"
                  ? "bg-[#032E1580]"
                  : "bg-[#46080980]")
              }
            >
              <span className="capitalize text-[12px] flex mx-auto">
                {operator.risk_level.toLowerCase()}
              </span>
            </button>
          ),
          operator: (
            <div className="flex gap-[12px] ">
              <Avatar className="w-[32px] h-[32px] rounded-[10px]">
                <AvatarImage
                  src={operator?.metadata?.logo}
                  alt={operator?.metadata?.name + " Logo"}
                />
                <AvatarFallback className="w-[32px] h-[32px] rounded-[10px] bg-blue-800/10">
                  {(operator.metadata?.name || "Anonymous Op").charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex my-auto">
                <span>{operator.metadata?.name || "Anonymous Op"}</span>
              </div>
            </div>
          ),
        })),
      }}
    />
  );
}
