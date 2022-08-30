import $api from '../http';
import { Contact } from './../models/Contact';

interface RequestArg<Type> {
    value: Type,
    successHandler?: () => void,
    finallyHandler?: () => void,
    errorHandler?: (e: any) => void,
}

class ContactsService {

    public static async getById({ value: id, successHandler, finallyHandler, errorHandler }: RequestArg<number>) {
        try {
            const { data: contact } = await $api.get<Contact | {}>("/contacts/" + id);
            if (successHandler) successHandler();
            if (finallyHandler) finallyHandler();
            return "id" in contact ? contact : null;
        } catch (e) {
            if (errorHandler) errorHandler(e);
            if (finallyHandler) finallyHandler();
            return null;
        }
    }

    public static async create({ value, successHandler, finallyHandler, errorHandler }: RequestArg<Omit<Contact, "id" | "key">>) {
        try {
            await $api.post("/contacts", { ...value, id: Date.now(), key: Date.now() });
            if (successHandler) successHandler();
        } catch (e) {
            if (errorHandler) errorHandler(e);
        } finally {
            if (finallyHandler) finallyHandler();
        }
    }

    public static async delete({ value: id, successHandler, finallyHandler, errorHandler }: RequestArg<number>) {
        try {
            await $api.delete(`/contacts/${id}`);
            if (successHandler) successHandler();
        } catch (e) {
            if (errorHandler) errorHandler(e);
        } finally {
            if (finallyHandler) finallyHandler();
        }
    }

    public static async update({ value, successHandler, finallyHandler, errorHandler }: RequestArg<Contact>) {
        try {
            await $api.put(`/contacts/${value.id}`, value);
            if (successHandler) successHandler();
        } catch (e) {
            if (errorHandler) errorHandler(e);
        } finally {
            if (finallyHandler) finallyHandler();
        }
    }

}

export default ContactsService;