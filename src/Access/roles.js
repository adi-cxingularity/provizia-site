import staff from "../assets/images/StaffAccess.png";
import investor from "../assets/images/InvestorAccess.png";

const roles = [
  {
    title: "Staff Access",
    desc: "Manage your account and access personalized services.",
    route: "/staff",
    loginUrl: "https://cx-lending-core.web.app/login",
    image: staff,
  },
  {
    title: "Investor Access",
    desc: "Access exclusive investment opportunities and detailed market insights.",
    route: "/investor",
    loginUrl: "https://cx-lending-syndicate.web.app/login",
    image: investor,
  },
];

export default roles;
