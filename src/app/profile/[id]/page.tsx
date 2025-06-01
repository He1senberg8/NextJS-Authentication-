export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            <p className="text-4xl">This is the profile page. You can add your profile details here. {params.id}</p>
            <p>Use this space to display user information, settings, or any other relevant data.</p>
        </div>
    );
}