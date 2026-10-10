import React from 'react';
import { AuditPayload } from '../types/audit';
import { 
  X, 
  Trash2, 
  ExternalLink, 
  Clock, 
  FileText, 
  ArrowRight,
  Globe
} from 'lucide-react';

interface AuditHistoryModalProps {
  audits: AuditPayload[];
  isOpen: boolean;
  onClose: () => void;
  onSelectAudit: (audit: AuditPayload) => void;
  onDeleteAudit: (id: string) => void;
}

export const AuditHistoryModal: React.FC<AuditHistoryModalProps> = ({
  audits,
  isOpen,
  onClose,
  onSelectAudit,
  onDeleteAudit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Audit History Archive</h3>
              <p className="text-xs text-slate-400">
                {audits.length} cached website audits stored in session
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of audits */}
        <div className="max-h-[60vh] overflow-y-auto p-5 divide-y divide-slate-100">
          {audits.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="font-bold text-slate-700">No Audits Run Yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Enter any website URL on the home screen to generate an in-depth report.
              </p>
            </div>
          ) : (
            audits.map((item) => (
              <div
                key={item.id}
                className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-lg transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {item.summary.url}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>
                      Overall: <strong className="text-slate-800">{item.summary.overall_score}/100</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Dev: <strong className="text-slate-800">{item.summary.dev_score}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      SEO: <strong className="text-slate-800">{item.summary.seo_score}</strong>
                    </span>
                    <span className="text-slate-400 hidden sm:inline">
                      · {new Date(item.summary.timestamp || item.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectAudit(item);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  {item.id && (
                    <button
                      type="button"
                      onClick={() => onDeleteAudit(item.id!)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
