import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Save, X, Loader2, User, BookOpen, Mail, GraduationCap } from 'lucide-react';
import PhotoUpload from './PhotoUpload';
import DatePicker from '../ui/DatePicker';
import CustomSelect from '../ui/CustomSelect';
import { COURSES, YEARS, GENDERS } from '../../utils/helpers';
import {
  nameRules, courseRules, yearRules, dateOfBirthRules,
  emailRules, mobileNumberRules, genderRules, addressRules
} from '../../utils/validators';

const FieldError = ({ error }) =>
  error ? (
    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
      <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
      {error.message}
    </p>
  ) : null;

const labelClass = 'block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';
const inputBase = 'w-full px-3 py-2 sm:py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white';
const inputNormal = `${inputBase} border-gray-200 hover:border-gray-300`;
const inputError = `${inputBase} border-red-400 focus:ring-red-400 bg-red-50`;

const SectionHeader = ({ icon: Icon, title, color }) => (
  <div className="col-span-1 sm:col-span-2 flex items-center gap-2 pb-1.5 sm:pb-2 border-b border-gray-100 mt-1 sm:mt-2">
    <div className={`p-1 sm:p-1.5 ${color} rounded-lg`}>
      <Icon size={12} className="text-white sm:hidden" />
      <Icon size={14} className="text-white hidden sm:block" />
    </div>
    <h4 className="text-xs sm:text-sm font-bold text-gray-700">{title}</h4>
  </div>
);

const StudentForm = ({ initialData = null, onSubmit, loading = false, onCancel }) => {
  const navigate = useNavigate();
  const isEdit = !!initialData;
  const handleCancel = onCancel || (() => navigate(-1));
  const [photoFile, setPhotoFile] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: initialData
      ? {
          name: initialData.name,
          course: initialData.course,
          year: initialData.year,
          dateOfBirth: initialData.dateOfBirth
            ? new Date(initialData.dateOfBirth).toISOString().split('T')[0]
            : '',
          email: initialData.email,
          mobileNumber: initialData.mobileNumber,
          gender: initialData.gender,
          address: initialData.address,
          isActive: initialData.isActive !== false ? 'true' : 'false'
        }
      : { isActive: 'true' }
  });

  const handleFormSubmit = (data) => {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') fd.append(k, v);
    });
    // ensure isActive always sent (default true)
    if (!data.isActive) fd.append('isActive', 'true');
    if (photoFile instanceof File) fd.append('photo', photoFile);
    onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">

        {/* — Personal Info — */}
        <SectionHeader icon={User} title="Personal Information" color="bg-blue-500" />

        {/* Name */}
        <div className="col-span-1 sm:col-span-2">
          <label className={labelClass}>Full Name <span className="text-red-400">*</span></label>
          <input
            type="text"
            {...register('name', nameRules)}
            className={errors.name ? inputError : inputNormal}
            placeholder="Enter student's full name"
          />
          <FieldError error={errors.name} />
        </div>

        {/* Date of Birth — custom picker */}
        <div>
          <label className={labelClass}>Date of Birth <span className="text-red-400">*</span></label>
          <Controller
            name="dateOfBirth"
            control={control}
            rules={dateOfBirthRules}
            render={({ field }) => (
              <DatePicker
                value={field.value || ''}
                onChange={field.onChange}
                placeholder="Pick date of birth"
                error={!!errors.dateOfBirth}
              />
            )}
          />
          <FieldError error={errors.dateOfBirth} />
        </div>

        {/* Gender */}
        <div>
          <label className={labelClass}>Gender <span className="text-red-400">*</span></label>
          <div className="flex gap-2 mt-1">
            {GENDERS.map((g) => (
              <label key={g} className="flex-1" onMouseDown={(e) => e.preventDefault()}>
                <input type="radio" value={g} {...register('gender', genderRules)} className="sr-only peer" tabIndex={-1} />
                <div className="w-full py-2 sm:py-2.5 text-center text-xs font-semibold border rounded-xl cursor-pointer transition-all border-gray-200 text-gray-500 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:border-blue-300">
                  {g}
                </div>
              </label>
            ))}
          </div>
          <FieldError error={errors.gender} />
        </div>

        {/* — Academic Info — */}
        <SectionHeader icon={GraduationCap} title="Academic Details" color="bg-violet-500" />

        {/* Course */}
        <div>
          <label className={labelClass}>Course <span className="text-red-400">*</span></label>
          <Controller
            name="course"
            control={control}
            rules={courseRules}
            render={({ field }) => (
              <CustomSelect
                value={field.value || ''}
                onChange={field.onChange}
                options={COURSES.map((c) => ({ value: c, label: c }))}
                placeholder="Select course"
                icon={BookOpen}
                error={!!errors.course}
                fullWidth
              />
            )}
          />
          <FieldError error={errors.course} />
        </div>

        {/* Year */}
        <div>
          <label className={labelClass}>Year of Study</label>
          <div className="grid grid-cols-6 gap-1">
            {YEARS.map((y) => (
              <label key={y} onMouseDown={(e) => e.preventDefault()}>
                <input type="radio" value={y} {...register('year', yearRules)} className="sr-only peer" tabIndex={-1} />
                <div className="w-full py-2 text-center text-xs font-bold border rounded-lg cursor-pointer transition-all border-gray-200 text-gray-500 peer-checked:bg-violet-600 peer-checked:text-white peer-checked:border-violet-600 hover:border-violet-300">
                  {y}
                </div>
              </label>
            ))}
          </div>
          <FieldError error={errors.year} />
        </div>

        {/* — Contact Info — */}
        <SectionHeader icon={Mail} title="Contact Information" color="bg-emerald-500" />

        {/* Email */}
        <div>
          <label className={labelClass}>Email Address <span className="text-red-400">*</span></label>
          <input
            type="email"
            {...register('email', emailRules)}
            className={errors.email ? inputError : inputNormal}
            placeholder="student@example.com"
          />
          <FieldError error={errors.email} />
        </div>

        {/* Mobile */}
        <div>
          <label className={labelClass}>Mobile Number <span className="text-red-400">*</span></label>
          <input
            type="tel"
            {...register('mobileNumber', mobileNumberRules)}
            className={errors.mobileNumber ? inputError : inputNormal}
            placeholder="9XXXXXXXXX"
            maxLength={10}
          />
          <FieldError error={errors.mobileNumber} />
        </div>

        {/* Address */}
        <div className="col-span-1 sm:col-span-2">
          <label className={labelClass}>Address <span className="text-red-400">*</span></label>
          <textarea
            rows={2}
            {...register('address', addressRules)}
            className={errors.address ? inputError : inputNormal}
            placeholder="Enter full residential address"
          />
          <FieldError error={errors.address} />
        </div>

        {/* — Photo — */}
        <SectionHeader icon={User} title="Profile Photo" color="bg-pink-500" />

        <div className="col-span-1 sm:col-span-2">
          <PhotoUpload
            currentPhotoUrl={
              initialData?.photo
                ? initialData.photo.startsWith('http')
                  ? initialData.photo
                  : `${import.meta.env.VITE_UPLOAD_URL}${initialData.photo}`
                : null
            }
            onChange={(file) => setPhotoFile(file)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <X size={16} /> Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 sm:flex-none px-5 sm:px-7 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {loading ? 'Saving...' : isEdit ? 'Update Student' : 'Add Student'}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
