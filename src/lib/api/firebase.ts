import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { 
  User,
  Customer,
  Appointment,
  Pet
} from './types';

// Collections
const USERS = 'users';
const CUSTOMERS = 'customers';
const APPOINTMENTS = 'appointments';
const PETS = 'pets';

export const firestoreApi = {
  // Users
  async createUser(userData: Omit<User, 'id'>) {
    const docRef = await addDoc(collection(db, USERS), {
      ...userData,
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...userData };
  },

  async getUser(id: string) {
    const docRef = doc(db, USERS, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as User : null;
  },

  // Customers
  async getCustomers() {
    const querySnapshot = await getDocs(collection(db, CUSTOMERS));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Customer[];
  },

  async createCustomer(customerData: Omit<Customer, 'id'>) {
    const docRef = await addDoc(collection(db, CUSTOMERS), {
      ...customerData,
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...customerData };
  },

  async updateCustomer(id: string, data: Partial<Customer>) {
    const docRef = doc(db, CUSTOMERS, id);
    await updateDoc(docRef, data);
    return { id, ...data };
  },

  async deleteCustomer(id: string) {
    await deleteDoc(doc(db, CUSTOMERS, id));
  },

  // Appointments
  async getAppointments() {
    const querySnapshot = await getDocs(collection(db, APPOINTMENTS));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Appointment[];
  },

  async createAppointment(appointmentData: Omit<Appointment, 'id'>) {
    const docRef = await addDoc(collection(db, APPOINTMENTS), {
      ...appointmentData,
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...appointmentData };
  },

  async updateAppointment(id: string, data: Partial<Appointment>) {
    const docRef = doc(db, APPOINTMENTS, id);
    await updateDoc(docRef, data);
    return { id, ...data };
  },

  async deleteAppointment(id: string) {
    await deleteDoc(doc(db, APPOINTMENTS, id));
  },

  // Pets
  async createPet(petData: Omit<Pet, 'id'>) {
    const docRef = await addDoc(collection(db, PETS), {
      ...petData,
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...petData };
  },

  async updatePet(id: string, data: Partial<Pet>) {
    const docRef = doc(db, PETS, id);
    await updateDoc(docRef, data);
    return { id, ...data };
  },

  async deletePet(id: string) {
    await deleteDoc(doc(db, PETS, id));
  },

  // Queries
  async getCustomerAppointments(customerId: string) {
    const q = query(
      collection(db, APPOINTMENTS),
      where('customerId', '==', customerId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Appointment[];
  },

  async getCustomerPets(customerId: string) {
    const q = query(
      collection(db, PETS),
      where('customerId', '==', customerId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Pet[];
  },
};