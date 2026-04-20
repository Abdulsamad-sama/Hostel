import { useFormContext } from "react-hook-form";

export default function MediaStep() {
    const { setValue } = useFormContext();

    const handleFiles = (e: any) => {
        const files = Array.from(e.target.files).map((f: any) => f.name);
        setValue("images", files);
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFiles} />
        </div>
    );
}