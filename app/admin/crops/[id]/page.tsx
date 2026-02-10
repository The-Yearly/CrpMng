'use client';

import { useMemo, use } from 'react';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type CropStage = {
  activity: string;
  days: string;
};

type Crop = {
  id: string;
  name: string;
  image: string;
  fieldsCount: number;
  stages: CropStage[];
};

const CROPS: Crop[] = [
  {
    id: '1',
    name: 'Chilli',
    image: 'https://img.freepik.com/premium-photo/bunch-red-hot-chili-pepper-closeup-dark-background-selective-focus-no-people-concept-food-background-toned-image_322022-820.jpg',
    fieldsCount: 12,
    stages: [
      { activity: 'Main field preparation', days: '0–45' },
      { activity: 'Nursery stage', days: '0–45' },
      { activity: 'Transplanting / Sowing stage', days: '46–60' },
      { activity: 'Thinning / Gap filling', days: '46–60' },
      { activity: 'Vegetative stage', days: '61–110' },
      { activity: 'Flowering stage', days: '110–140' },
      { activity: 'Green fruit stage', days: '140–160' },
      { activity: 'Ripening fruit stage', days: '160–180' },
      { activity: 'Harvesting stage', days: '180–210' },
      { activity: 'Post harvesting stage', days: '210–230' },
    ],
  },
  {
    id: '2',
    name: 'Turmeric',
    image: 'https://www.pepperhub.in/wp-content/uploads/2023/09/1bf06c5cea51367e2212422781978436-1024x768_11zon.jpg',
    fieldsCount: 25,
    stages: [],
  },
];

export default function CropDetailPage({ params }: PageProps) {
  // Unwrap params (Next.js 15)
  const resolvedParams = use(params);
  const cropId = resolvedParams.id;

  const crop = useMemo(
    () => CROPS.find(c => c.id === cropId),
    [cropId]
  );

  const totalDuration = useMemo(() => {
    if (!crop || crop.stages.length === 0) return null;

    const lastStage = crop.stages[crop.stages.length - 1];
    const endDay = lastStage.days.split('–')[1];

    return endDay ? `${endDay} days` : null;
  }, [crop]);

  if (!crop) {
    return (
      <div className="p-6 text-red-500">
        Crop not found
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">

      {/* Crop Header */}
      <div className="flex gap-6 items-start">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-40 h-40 rounded-full object-cover border"
        />

        <div className="space-y-1">
          <h1 className="text-3xl font-bold">
            {crop.name}
          </h1>

          <p className="text-gray-600">
            Crop ID: <span className="font-medium">{crop.id}</span>
          </p>

          <p className="text-gray-600">
            Fields currently growing this crop: {crop.fieldsCount}
          </p>

          {totalDuration && (
            <p className="text-gray-600">
              Total crop duration: {totalDuration}
            </p>
          )}
        </div>
      </div>

      {/* Activity Stages */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Crop Activity Stages
        </h2>

        {crop.stages.length === 0 ? (
          <p className="text-gray-500">
            No stage data available for this crop.
          </p>
        ) : (
          <table className="w-full border border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">
                  Activity
                </th>
                <th className="border px-4 py-2 text-left">
                  Days
                </th>
              </tr>
            </thead>
            <tbody>
              {crop.stages.map((stage, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    {stage.activity}
                  </td>
                  <td className="border px-4 py-2">
                    {stage.days}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
