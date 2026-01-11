import Link from 'next/link';
import Image from 'next/image';
import { getZohoProducts } from '@/lib/zoho-inventory';
import { Plus, Search, Pencil, Trash2, Package } from 'lucide-react';
import { DeleteButton } from './delete-button'; // Client component for delete action

export const dynamic = 'force-dynamic'; // Always fetch fresh data

export default async function AdminProductsPage() {
    const products = await getZohoProducts();

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
                    <p className="text-white/40">Manage your inventory and store items</p>
                </div>

                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </Link>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                {/* Toolbar */}
                <div className="p-4 border-b border-white/10 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/20"
                        />
                    </div>
                    <div className="text-sm text-white/40">
                        {products.length} Products
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-white/40 text-sm font-medium">
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.map((product) => (
                                <tr key={product.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden relative border border-white/10">
                                                {product.image ? (
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <Package className="w-6 h-6 m-auto text-white/20" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-white group-hover:text-purple-400 transition-colors">
                                                    {product.name}
                                                </div>
                                                <div className="text-xs text-white/40 font-mono mt-1">
                                                    {/* Assuming SKU isn't strictly typed in Product yet but might break, so cautious */}
                                                    {/* @ts-ignore */}
                                                    {product.sku || product.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/10">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white font-mono">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${product.stock
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}>
                                            {product.stock ? 'In Stock' : 'Out of Stock'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/products/${product.id}`}
                                                className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                            <DeleteButton id={product.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {products.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="w-8 h-8 text-white/20" />
                            </div>
                            <h3 className="text-white font-medium mb-1">No products found</h3>
                            <p className="text-white/40 text-sm">Get started by creating your first product.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
