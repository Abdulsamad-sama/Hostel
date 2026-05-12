import { useFormContext } from "react-hook-form";

export default function MediaStep() {
    const { setValue } = useFormContext();

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).map((f) => f.name);
        setValue("images", files);
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFiles} />
        </div>
    );
}