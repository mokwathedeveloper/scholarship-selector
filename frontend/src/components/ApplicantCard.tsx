import { ApplicantCardProps } from '../types/applicant'; // Import the interface

export default function ApplicantCard({ applicant }: ApplicantCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center space-x-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
        {applicant.name.charAt(0)}
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-semibold text-gray-800">{applicant.name}</h2>
        <p className="text-gray-600">Email: {applicant.email}</p>
        <p className="text-gray-600">GPA: {applicant.gpa}</p>
        <p className="text-gray-600">Experience: {applicant.experience} years</p>
        <p className="text-gray-600">Skills: {applicant.skills.join(', ')}</p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-2xl font-bold text-blue-600">Score: {applicant.score}</p>
      </div>
    </div>
  );
}