'use server';

import { createZohoProduct, updateZohoProduct, deleteZohoProduct } from '@/lib/zoho-inventory';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProductAction(prevState: any, formData: FormData) {
    const res = await createZohoProduct(formData);

    if (res.success) {
        revalidatePath('/shop'); // Update public shop
        revalidatePath('/admin/products'); // Update admin list
        redirect('/admin/products');
    } else {
        return { error: res.error || 'Failed to create product' };
    }
}

export async function updateProductAction(id: string, prevState: any, formData: FormData) {
    const res = await updateZohoProduct(id, formData);

    if (res.success) {
        revalidatePath('/shop');
        revalidatePath(`/shop/${id}`);
        revalidatePath('/admin/products');
        redirect('/admin/products');
    } else {
        return { error: res.error || 'Failed to update product' };
    }
}

export async function deleteProductAction(id: string) {
    const res = await deleteZohoProduct(id);
    if (res.success) {
        revalidatePath('/shop');
        revalidatePath('/admin/products');
        return { success: true };
    }
    return { success: false, error: res.error };
}
