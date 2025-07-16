import { useRef, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DatasetSelector from "../features/datasets/components/DatasetSelector";
import Filters from "../features/datasets/components/Filters";
import DataTable from "../features/datasets/components/DataTable";
import { SkeletonTable } from "../components/ui/Skeleton";
import { toast } from "react-toastify";

const PER_PAGE = 7; // Nombre d'éléments par page 

export default function DataSection() {
  /* ---------------- Gestion URL - Synchronisation état/URL ---------------- */
  const [params, setParams] = useSearchParams();
  const ds = params.get("ds") ?? "equipments"; // Dataset par défaut

  /* ---------------- État local pagination ------------------------- */
  const [page, setPage] = useState(1);
  const tableRef = useRef(null); // Référence pour scroll automatique

  /* ---------------- Nettoyage paramètres URL ------------------------ */
  const cleanParams = useMemo(() => {
    const p = new URLSearchParams(params);
    return p; // Supprime paramètres inutiles pour cache query
  }, [params]);

  /* ---------------- Fetch données avec React Query -------- */
  const { data, isFetching } = useQuery({
    queryKey: ["records-full", ds, cleanParams.toString()], // Cache par dataset + filtres
    queryFn: async () => {
      const q = new URLSearchParams(cleanParams);
      q.set("rows", "1000"); // Récupère beaucoup de données pour pagination côté client
      const res = await fetch(`/api/${ds}?${q.toString()}`);
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    },
    staleTime: 1_000 * 60 * 10, // Cache 10 minutes (données relativement statiques)
    onError: e => toast.error(`Erreur : ${e.message}`), // Notification d'erreur
  });

  /* ---------------- Pagination côté client ------------------------ */
  const allRows = data?.results ?? [];
  const total = allRows.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE)); // Au moins 1 page
  const slice = allRows.slice((page - 1) * PER_PAGE, page * PER_PAGE); // Données de la page actuelle

  /* ---------------- Handlers d'interaction ------------------------------- */
  
  // Changement de dataset (équipements → espaces verts → fontaines)
  const setDataset = k => {
    const p = new URLSearchParams();
    p.set("ds", k); // Garde seulement le dataset, reset filtres
    setParams(p, { replace: true }); // Replace évite pollution historique
    setPage(1); // Retour page 1
  };

  // Application des filtres (debounced depuis composant Filters)
  const onFilter = useCallback(obj => {
    const p = new URLSearchParams();
    p.set("ds", ds); // Garde dataset actuel
    Object.entries(obj).forEach(([k, v]) => v && p.set(k, v)); // Ajoute filtres non-vides
    setParams(p, { replace: true });
    setPage(1); // Reset pagination à chaque filtre
  }, [ds, setParams]);

  // Changement de page avec scroll automatique
  const onPage = pNum => {
    setPage(pNum);
    tableRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll vers tableau
  };

  /* ---------------- Rendu interface ---------------------------------- */
  return (
    <section
      id="data" // Ancre pour navigation smooth depuis navbar
      className="
        w-full px-6 py-14
        bg-gradient-to-br from-primary/15 via-primary/8 to-white
        dark:bg-gradient-to-br dark:from-primary/25 dark:via-primary/15 dark:to-dark
        text-gray-900 dark:text-light
        border-t border-primary/20
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section avec titre stylisé */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl text-primary dark:text-white mb-4">
            Explorer les données
          </h2>
          {/* Barre décorative gradient */}
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"></div>
        </div>

        {/* Sélecteur de dataset - Interface à onglets */}
        <DatasetSelector selected={ds} onChange={setDataset} />
        
        {/* Filtres - Interface de recherche et sélection */}
        <Filters key={ds} dataset={ds} onFilter={onFilter} />
        {/* key={ds} force remount quand dataset change = reset filtres */}

        {/* Table avec skeleton loading */}
        {isFetching ? (
          <SkeletonTable /> // Animation de chargement
        ) : (
          <div ref={tableRef}> {/* Référence pour scroll automatique */}
            <DataTable
              data={slice}     // Données de la page actuelle
              total={total}    // Total pour affichage compteur
              page={page}      // Page actuelle
              pages={pages}    // Nombre total de pages
              onPage={onPage}  // Callback changement page
              dataset={ds}     // Type dataset pour configuration colonnes
            />
          </div>
        )}
      </div>
    </section>
  );
}