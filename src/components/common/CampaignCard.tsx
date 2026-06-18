import Link from "next/link";
import { Campaign, formatFee, getDday } from "@/lib/dummy-data";
import { Users, Clock, MapPin } from "lucide-react";

interface Props {
  campaign: Campaign;
  href?: string;
}

export default function CampaignCard({ campaign, href }: Props) {
  const dday = getDday(campaign.applicationDeadline);
  const isDdayCritical = dday === "마감" || dday === "D-Day" || dday === "D-1" || dday === "D-2" || dday === "D-3";

  return (
    <Link href={href || `/campaigns/${campaign.id}`}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer">
        {/* Product Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          <img
            src={campaign.productImage}
            alt={campaign.productName}
            className="w-full h-full object-cover"
          />
          <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${
            isDdayCritical ? "bg-red-500 text-white" : "bg-white text-gray-700 shadow"
          }`}>
            {dday}
          </div>
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-600 border border-rose-100">
            {campaign.platform}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-gray-400 font-medium mb-1">{campaign.brandName}</p>
          <h3 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-1">{campaign.productName}</h3>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-rose-500 font-bold text-base">{formatFee(campaign.fee)}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Users size={12} />
              {campaign.slots}명 모집
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {campaign.targetCountry}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {campaign.applicationDeadline}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
