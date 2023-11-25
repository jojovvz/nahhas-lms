import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FaBrush } from "react-icons/fa6";

const Course = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    console.log("You aren't signed in to your account.");
    return redirect("/dashboard/teacher/courses");
  }
  const courseId = params.courseId;
  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId: userId,
    },
  });
  if (!course) {
    console.log("Course not found!");
    return redirect("/dashboard/teacher/courses");
  }

  const requiredFields = [
    course.title,
    course.desription,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];
  const totalFileds = requiredFields.length;
  const completedFileds = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFileds}/${totalFileds})`;

  return (
    <div className="container px-4 p-6">
      <div className="flex items-start justify-center flex-col">
        <h1 className="text-5xl font-bold mb-2">Completing Course Info</h1>
        <span className="text-sm text-muted-foreground">
          Complete all fields {completionText}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-16 gap-6">
        <div className="flex items-center gap-x-2">
          <FaBrush className="w-8 h-8 p-2 bg-accent rounded-lg text-primary" />
          <h2 className="text-xl">Customize your course</h2>
        </div>
      </div>
    </div>
  );
};

export default Course;
