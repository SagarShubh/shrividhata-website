'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, Loader2, Save, ArrowLeft, X } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductFormProps {
    initialData?: Product;
    action: (formData: FormData) => Promise<any>;
}

export function ProductForm({ initialData, action }: ProductFormProps) {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(initialData?.image || null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // We can't use action={action} directly on form comfortably if we need complex loading states 
        // without using experimental useFormStatus hooks or similar.
        // So we manually call the server action here.

        const formData = new FormData(e.currentTarget);
        const res = await action(formData);

        if (res?.error) {
            alert(res.error);
            setLoading(false);
        }
        // Success redirect happens on server side
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            {initialData ? 'Edit Product' : 'New Product'}
                        </h1>
                        <p className="text-white/40 text-sm">
                            {initialData ? `Updating ${initialData.name}` : 'Add a new item to your inventory'}
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-medium hover:bg-white/90 transition-all disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {initialData ? 'Update Changes' : 'Create Product'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col - Image */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <label className="block text-sm font-medium text-white mb-4">Product Image</label>
                        <div className="relative aspect-square bg-black/20 rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 transition-colors overflow-hidden group">
                            {preview ? (
                                <>
                                    <Image src={preview} alt="Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white text-sm font-medium">Change Image</p>
                                    </div>
                                </>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
                                    <Upload className="w-8 h-8 mb-2" />
                                    <span className="text-sm">Upload Image</span>
                                </div>
                            )}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Col - Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-medium text-white border-b border-white/10 pb-4">General Information</h3>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-white/60 mb-2">Product Name</label>
                                <input
                                    required
                                    name="name"
                                    defaultValue={initialData?.name}
                                    type="text"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                                    placeholder="e.g. HDMI Cable 5m"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Price (₹)</label>
                                <input
                                    required
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    defaultValue={initialData?.price}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">SKU</label>
                                <input
                                    required
                                    name="sku"
                                    type="text"
                                    // @ts-ignore
                                    defaultValue={initialData?.sku || ''}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                                    placeholder="PROD-001"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Description</label>
                            <textarea
                                name="description"
                                rows={4}
                                defaultValue={initialData?.description}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                                placeholder="Product description and key features..."
                            />
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-medium text-white border-b border-white/10 pb-4">Organization</h3>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Category</label>
                                <select
                                    name="category"
                                    defaultValue={initialData?.category || 'Accessories'}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none"
                                >
                                    <option value="Cameras">Cameras</option>
                                    <option value="Recorders">Recorders</option>
                                    <option value="Storage">Storage</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Networking">Networking</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Sub Category</label>
                                <input
                                    name="subCategory"
                                    defaultValue={initialData?.subCategory}
                                    type="text"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                                    placeholder="e.g. Cables"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-white/60 mb-2">Initial Stock</label>
                                <input
                                    name="stock"
                                    type="number"
                                    min="0"
                                    // Default to 10 if new, or current value. Note: API only sets initial stock on create. Update allows adjustment? 
                                    // Zoho Inventory usually requires an "Adjustement" transaction to change stock, not just PUT field.
                                    // For this simple implementation we might just send it and see if Zoho accepts it or ignore stock updates for now.
                                    // We will disable stock editing in Update mode for now to avoid complexity.
                                    defaultValue={initialData?.stock ? 10 : 0}
                                    disabled={!!initialData}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
                                    placeholder="0"
                                />
                                {initialData && <p className="text-xs text-white/30 mt-1">Stock cannot be edited directly here. Use Zoho Inventory for adjustments.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
