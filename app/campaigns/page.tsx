'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Calendar, Trash2 } from 'lucide-react';
import { storage } from '@/utils/storage';
import { Campaign } from '@/types/campaign';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    setCampaigns(storage.getCampaigns());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Удалить кампанию? Это действие нельзя отменить.')) {
      storage.deleteCampaign(id);
      setCampaigns(storage.getCampaigns());
    }
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'Активна';
      case 'paused':
        return 'Пауза';
      case 'completed':
        return 'Завершена';
      default:
        return 'Черновик';
    }
  };

  return (
    <div className="p-8">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Кампании</h1>
          <p className="text-foreground/60">
            Список сохранённых кампаний. Создайте новую или отредактируйте
            существующую.
          </p>
        </div>
        <Link
          href="/campaigns/new"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold hover:scale-105 transform transition-all shadow-lg shadow-primary/30"
        >
          <Plus className="w-5 h-5" />
          Новая кампания
        </Link>
      </div>

      {/* Список кампаний */}
      {campaigns.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Пока нет кампаний</h3>
          <p className="text-foreground/60 mb-6">
            Создайте первую, чтобы начать настраивать сценарии лояльности.
          </p>
          <Link
            href="/campaigns/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold hover:scale-105 transform transition-all"
          >
            <Plus className="w-5 h-5" />
            Создать кампанию
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {campaign.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {getStatusText(campaign.status)}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-foreground/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Создана:{" "}
                        {new Date(campaign.createdAt).toLocaleDateString(
                          "ru-RU"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Узлов: {campaign.nodes?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        Обновлена:{" "}
                        {new Date(campaign.updatedAt).toLocaleDateString(
                          "ru-RU"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/editor/${campaign.id}`}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
                  >
                    Открыть
                  </Link>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(campaign.id);
                    }}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
