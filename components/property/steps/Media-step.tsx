import { useFormContext } from "react-hook-form";

export default function MediaStep() {
    const { setValue, formState: { errors } } = useFormContext();

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).map((f) => f.name);
        setValue("images", files, { shouldValidate: true, shouldDirty: true });
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Upload Images</label>
                <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={handleFiles} 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            {errors.images?.message && (
                <p className="text-sm text-destructive">{String(errors.images.message)}</p>
            )}
        </div>
    );
}