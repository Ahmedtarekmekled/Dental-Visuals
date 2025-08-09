import type { Service } from "@/data";

type Props = {
  service: Service;
};

export default function ServiceCard({ service }: Props) {
  return (
    <div className="group border border-gray-800 rounded-2xl p-8 transition-all duration-500 hover:bg-gray-900/50 hover:border-gray-700 backdrop-blur-sm">
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-medium text-primary">
          {service.name}
        </h3>
        <p className="text-gray-300 leading-relaxed">{service.description}</p>
        {service.target && (
          <div className="pt-2 border-t border-gray-800">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Target: {service.target}
            </p>
          </div>
        )}
      </div>

      {/* Hover indicator */}
      <div className="w-0 h-px bg-primary group-hover:w-8 transition-all duration-300 mt-6"></div>
    </div>
  );
}
