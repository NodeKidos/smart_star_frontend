'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { User, GraduationCap, Home, FileText, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitApplication } from '@/lib/api';
import styles from './page.module.css';

interface FormData {
    parentFullName: string;
    studentFirstName: string;
    studentSurname: string;
    studentDob: string;
    gender: string;
    schoolYear: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postcode: string;
    examCenter: string;
}

interface FormErrors {
    [key: string]: string;
}

const INITIAL_FORM: FormData = {
    parentFullName: '',
    studentFirstName: '',
    studentSurname: '',
    studentDob: '',
    gender: '',
    schoolYear: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    examCenter: 'Harrow',
};

const SCHOOL_YEARS = [
    'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6',

];

export default function ApplyNowPage() {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    const validate = (): FormErrors => {
        const errs: FormErrors = {};
        if (!formData.parentFullName.trim()) errs.parentFullName = 'Parent full name is required';
        if (!formData.studentFirstName.trim()) errs.studentFirstName = 'Student first name is required';
        if (!formData.studentSurname.trim()) errs.studentSurname = 'Student surname is required';
        if (!formData.studentDob) errs.studentDob = 'Date of birth is required';
        if (!formData.gender) errs.gender = 'Gender is required';
        if (!formData.schoolYear) errs.schoolYear = 'School year is required';
        if (!formData.email.trim()) {
            errs.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errs.email = 'Enter a valid email address';
        }
        if (!formData.phone.trim()) errs.phone = 'Phone number is required';
        if (!formData.address.trim()) errs.address = 'Address is required';
        if (!formData.city.trim()) errs.city = 'City is required';
        if (!formData.postcode.trim()) errs.postcode = 'Postcode is required';
        return errs;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setServerError('');

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            await submitApplication(formData);
            setIsSuccess(true);
            setFormData(INITIAL_FORM);
        } catch (err) {
            setServerError(
                err instanceof Error ? err.message : 'Something went wrong. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className={styles.applyPage}>
                <div className={styles.applyInner}>
                    <div className={styles.formCard}>
                        <div className={styles.successMessage}>
                            <div className={styles.successIconWrap}>
                                <CheckCircle2 size={48} strokeWidth={1.5} />
                            </div>
                            <h2>Application Submitted!</h2>
                            <p>
                                Thank you for applying to Smart Star. We have received your application
                                and will review it shortly. You will receive a confirmation email at
                                the address you provided.
                            </p>
                            <Link href="/" className="btn btn-primary">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.applyPage}>
            <div className={styles.applyInner}>
                <div className={styles.applyHeader}>
                    <h1>Apply Now</h1>
                    <p>Fill in the form below to begin your child&apos;s journey with Smart Star</p>
                </div>

                <div className={styles.formCard}>
                    {serverError && (
                        <div className={styles.errorBanner}>
                            <AlertCircle size={18} />
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Parent Information */}
                        <h3 className={styles.formSectionTitle}>
                            <div className={styles.formSectionIconWrap}>
                                <User size={18} strokeWidth={2} />
                            </div>
                            Parent / Guardian Information
                        </h3>
                        <div className={styles.formGrid}>
                            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                <label className={styles.formLabel} htmlFor="parentFullName">
                                    Full Name <span className={styles.formRequired}>*</span>
                                </label>
                                <input type="text" id="parentFullName" name="parentFullName" className={`${styles.formInput} ${errors.parentFullName ? styles.formInputError : ''}`} placeholder="Enter parent / guardian full name" value={formData.parentFullName} onChange={handleChange} />
                                {errors.parentFullName && <span className={styles.formError}>{errors.parentFullName}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="email">Email Address <span className={styles.formRequired}>*</span></label>
                                <input type="email" id="email" name="email" className={`${styles.formInput} ${errors.email ? styles.formInputError : ''}`} placeholder="parent@email.com" value={formData.email} onChange={handleChange} />
                                {errors.email && <span className={styles.formError}>{errors.email}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="phone">Phone Number <span className={styles.formRequired}>*</span></label>
                                <input type="tel" id="phone" name="phone" className={`${styles.formInput} ${errors.phone ? styles.formInputError : ''}`} placeholder="+44 XXX XXXX XXX" value={formData.phone} onChange={handleChange} />
                                {errors.phone && <span className={styles.formError}>{errors.phone}</span>}
                            </div>
                        </div>

                        {/* Student Information */}
                        <h3 className={styles.formSectionTitle}>
                            <div className={styles.formSectionIconWrap}>
                                <GraduationCap size={18} strokeWidth={2} />
                            </div>
                            Student Information
                        </h3>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="studentFirstName">First Name <span className={styles.formRequired}>*</span></label>
                                <input type="text" id="studentFirstName" name="studentFirstName" className={`${styles.formInput} ${errors.studentFirstName ? styles.formInputError : ''}`} placeholder="Student's first name" value={formData.studentFirstName} onChange={handleChange} />
                                {errors.studentFirstName && <span className={styles.formError}>{errors.studentFirstName}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="studentSurname">Surname <span className={styles.formRequired}>*</span></label>
                                <input type="text" id="studentSurname" name="studentSurname" className={`${styles.formInput} ${errors.studentSurname ? styles.formInputError : ''}`} placeholder="Student's surname" value={formData.studentSurname} onChange={handleChange} />
                                {errors.studentSurname && <span className={styles.formError}>{errors.studentSurname}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="studentDob">Date of Birth <span className={styles.formRequired}>*</span></label>
                                <input type="date" id="studentDob" name="studentDob" className={`${styles.formInput} ${errors.studentDob ? styles.formInputError : ''}`} value={formData.studentDob} onChange={handleChange} />
                                {errors.studentDob && <span className={styles.formError}>{errors.studentDob}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="gender">Gender <span className={styles.formRequired}>*</span></label>
                                <select id="gender" name="gender" className={`${styles.formSelect} ${errors.gender ? styles.formInputError : ''}`} value={formData.gender} onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <span className={styles.formError}>{errors.gender}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="schoolYear">School Year <span className={styles.formRequired}>*</span></label>
                                <select id="schoolYear" name="schoolYear" className={`${styles.formSelect} ${errors.schoolYear ? styles.formInputError : ''}`} value={formData.schoolYear} onChange={handleChange}>
                                    <option value="">Select School Year</option>
                                    {SCHOOL_YEARS.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                {errors.schoolYear && <span className={styles.formError}>{errors.schoolYear}</span>}
                            </div>
                        </div>

                        {/* Address */}
                        <h3 className={styles.formSectionTitle}>
                            <div className={styles.formSectionIconWrap}>
                                <Home size={18} strokeWidth={2} />
                            </div>
                            Address Details
                        </h3>
                        <div className={styles.formGrid}>
                            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                <label className={styles.formLabel} htmlFor="address">Address <span className={styles.formRequired}>*</span></label>
                                <input type="text" id="address" name="address" className={`${styles.formInput} ${errors.address ? styles.formInputError : ''}`} placeholder="Street address" value={formData.address} onChange={handleChange} />
                                {errors.address && <span className={styles.formError}>{errors.address}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="city">City <span className={styles.formRequired}>*</span></label>
                                <input type="text" id="city" name="city" className={`${styles.formInput} ${errors.city ? styles.formInputError : ''}`} placeholder="City" value={formData.city} onChange={handleChange} />
                                {errors.city && <span className={styles.formError}>{errors.city}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="postcode">Postcode <span className={styles.formRequired}>*</span></label>
                                <input type="text" id="postcode" name="postcode" className={`${styles.formInput} ${errors.postcode ? styles.formInputError : ''}`} placeholder="Postcode" value={formData.postcode} onChange={handleChange} />
                                {errors.postcode && <span className={styles.formError}>{errors.postcode}</span>}
                            </div>
                        </div>

                        {/* Exam & Fee */}
                        <h3 className={styles.formSectionTitle}>
                            <div className={styles.formSectionIconWrap}>
                                <FileText size={18} strokeWidth={2} />
                            </div>
                            Exam & Fee Details
                        </h3>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="examCenter">Exam Centre</label>
                                <select id="examCenter" name="examCenter" className={styles.formSelect} value={formData.examCenter} onChange={handleChange}>
                                    <option value="Harrow">Harrow</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Registration Fee</label>
                                <div className={styles.feeDisplay}>
                                    <span className={styles.feeLabel}>Amount</span>
                                    <span className={styles.feeAmount}>£15.00</span>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting Application...' : (
                                <>Submit Application <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
