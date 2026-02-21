import { FormInput } from "@/app/admin/crops/[id]/utils/cropActions";
import { User, X, Check } from "lucide-react";
interface FieldRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
  isEditing?: boolean;
  editNode?: React.ReactNode;
}
function FieldRow({ icon, label, value, isEditing, editNode }: FieldRowProps) {
  return (
    <div className="flex flex-col gap-1.5 py-4 border-b border-dashed border-stone-100 last:border-0">
      <div className="flex items-center gap-2">
        <span className="text-green-600 opacity-70">{icon}</span>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 leading-none">
          {label}
        </p>
      </div>
      {isEditing && editNode ? (
        editNode
      ) : (
        <p className="text-sm font-semibold text-stone-800 pl-6">
          {value ?? (
            <span className="text-stone-300 font-normal italic text-xs">
              Not provided
            </span>
          )}
        </p>
      )}
    </div>
  );
}

function EditInput({
  value,
  type,
  onChange,
}: {
  value: string | number;
  type: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      value={value}
      required
      type={type}
      onChange={(e) => onChange(e.target.value)}
      className="ml-6 w-[calc(100%-1.5rem)] text-sm font-semibold text-stone-800 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-green-300 transition-all"
    />
  );
}
const EditSelect = ({
  placeHolder,
  value,
  onChange,
  options,
}: {
  value: string;
  placeHolder: string;
  onChange: (v: string) => void;
  options: string[];
}) => {
  return (
    <select
      value={value}
      required
      onChange={(e) => onChange(e.target.value)}
      className="ml-6 w-[calc(100%-1.5rem)] text-sm font-semibold text-stone-800 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-green-300 transition-all"
    >
      <option value="" disabled hidden>
        Select - {placeHolder}
      </option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
};

export const BigPageForm = <T extends { [key: string]: any }>({
  data,
  setData,
  activity,
  isEditing,
  handleSave,
  handleCancel,
}: {
  data: T;
  activity: any;
  setData: React.Dispatch<React.SetStateAction<T>>;
  isEditing: boolean;
  handleSave: () => void;
  handleCancel: () => void;
}) => {
  console.log(activity);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-x-10"
    >
      {activity.inputs.map((field: FormInput, i: number) => (
        <FieldRow
          key={i}
          icon={field.icons}
          label={field.sub}
          value={data[field.name]}
          isEditing={isEditing}
          editNode={
            field.type != "dropDown" ? (
              <EditInput
                value={data[field.name]}
                type={field.type}
                onChange={(v) => setData((p) => ({ ...p, [field.name]: v }))}
              />
            ) : (
              <EditSelect
                value={data[field.name]}
                onChange={(v) => setData((p) => ({ ...p, [field.name]: v }))}
                placeHolder={field.sub}
                options={field.types || [""]}
              />
            )
          }
        />
      ))}
      {isEditing && (
        <div className="mt-8 pt-6 border-t border-stone-100 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all"
          >
            <X size={13} /> Discard
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Check size={13} /> Save Changes
          </button>
        </div>
      )}
    </form>
  );
};
