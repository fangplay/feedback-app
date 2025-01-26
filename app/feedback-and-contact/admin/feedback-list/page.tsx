"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/feedback-and-contact/admin"); // Redirect if not authenticated
      return;
    }

    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("/api/admin/feedback-list", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setFeedbacks(data);
        } else {
          // router.push("/feedback-and-contact/admin");
        }
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
        router.push("/feedback-and-contact/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    router.push("/feedback-and-contact/admin"); // Redirect to login page
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Feedback List</h1>
      <ul>
        {feedbacks.map((feedback: any) => (
          <li key={feedback.id}>{feedback.message}</li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default FeedbackList;
