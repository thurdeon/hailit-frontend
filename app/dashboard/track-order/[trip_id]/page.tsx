"use client";
import TrackOrder from "@/components/Dashboard/TrackOrder/TrackOrderDetailsDash";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";

const TrackedOrder = () => {
  return <TrackOrder />;
};

export default withAdminCheck(TrackedOrder);
