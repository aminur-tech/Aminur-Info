"use client";

import { motion as Motion } from "framer-motion";
import { Award, ExternalLink, FileText, ShieldCheck } from "lucide-react";
import type { Certification as CertificationRecord } from "../../types/portfolio";

const fallbackCertification: CertificationRecord = {
	id: "fallback",
	title: "Complete Web Development Course",
	issuer: "Programming Hero",
	credentialId: "WEB12-0983",
	credentialUrl: null,
	imageUrl: "/Certifications.png",
	description: "Rigorous certification validating excellence in MERN stack development and project-based application.",
};

export default function Certifications({ certifications = [] }: { certifications?: CertificationRecord[] }) {
	const entries = certifications.length > 0 ? certifications : [fallbackCertification];

	return (
		<section id="certifications" className="bg-slate-50 py-24 dark:bg-slate-950">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<Motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-14 max-w-2xl text-center">
					<span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400"><ShieldCheck size={15} /> Professional development</span>
					<h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">Credentials that support my work</h2>
					<p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">A selection of verified learning milestones and professional achievements.</p>
				</Motion.div>

				<div className="grid gap-7 lg:grid-cols-2">
					{entries.map((cert, index) => <CertificationCard key={cert.id} cert={cert} index={index} />)}
				</div>
			</div>
		</section>
	);
}

function CertificationCard({ cert, index }: { cert: CertificationRecord; index: number }) {
	const fileUrl = cert.imageUrl || "/Certifications.png";
	const isPdf = fileUrl.toLowerCase().includes(".pdf");

	return (
		<Motion.article initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08 }} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20">
			<div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
				<div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-slate-100 p-4 dark:bg-slate-800">
					{isPdf ? <a href={fileUrl} target="_blank" rel="noreferrer" className="flex min-h-56 w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 text-center text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-slate-600 dark:text-emerald-400 dark:hover:bg-slate-700" aria-label={`Open ${cert.title} PDF`}><FileText size={42} strokeWidth={1.5} /><span>Open certificate PDF</span></a> : <img src={fileUrl} alt={`${cert.title} certificate issued by ${cert.issuer}`} className="max-h-72 w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-[1.03]" />}
					<span className="absolute left-7 top-7 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm dark:bg-slate-900/90 dark:text-slate-300">Verified</span>
				</div>

				<div className="flex flex-col justify-between p-6 sm:p-8">
					<div>
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{cert.issuer}</p>
								<h3 className="mt-2 text-xl font-black leading-tight text-slate-900 dark:text-white">{cert.title}</h3>
							</div>
							<Award className="shrink-0 text-emerald-500" size={24} />
						</div>
						<p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">{cert.description || "Professional certification and continued learning achievement."}</p>
					</div>

					<div className="mt-7 border-t border-slate-200 pt-5 dark:border-slate-800">
						<p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Credential ID</p>
						<p className="mt-1 break-all font-mono text-sm text-slate-700 dark:text-slate-300">{cert.credentialId || "Available on request"}</p>
						{cert.credentialUrl && <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">View credential <ExternalLink size={16} /></a>}
					</div>
				</div>
			</div>
		</Motion.article>
	);
}
