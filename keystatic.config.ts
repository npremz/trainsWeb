import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    annonces: collection({
      label: 'Annonces',
      slugField: 'titre',
      path: 'src/content/annonces/*',
      format: { contentField: 'description_technique' },
      schema: {
        titre: fields.slug({ name: { label: 'Référence et Modèle (ex: Roco 63450 - Locomotive Série 55)' } }),
        prix: fields.number({ label: 'Prix de cession (€)' }),
        echelle: fields.select({
          label: 'Échelle',
          options: [
            { label: 'HO - 1/87', value: 'HO' },
            { label: 'N - 1/160', value: 'N' },
            { label: 'Z - 1/220', value: 'Z' },
            { label: 'O - 1/45', value: 'O' },
          ],
          defaultValue: 'HO',
        }),
        systeme: fields.select({
          label: 'Système',
          options: [
            { label: '2 Rails - DC (Analogique)', value: '2-rails-dc' },
            { label: '2 Rails - DCC (Digital)', value: '2-rails-dcc' },
            { label: '3 Rails - AC (Märklin)', value: '3-rails-ac' },
          ],
          defaultValue: '2-rails-dc',
        }),
        etat: fields.select({
          label: 'État',
          options: [
            { label: 'Neuf', value: 'neuf' },
            { label: 'Excellent (Peu roulé)', value: 'excellent' },
            { label: 'Bon état', value: 'bon' },
            { label: 'À restaurer', value: 'restaurer' },
          ],
          defaultValue: 'excellent',
        }),
        images: fields.array(
          fields.image({
            label: 'Image',
            directory: 'public/images/annonces',
            publicPath: '/images/annonces/',
          }),
          {
            label: 'Galerie photos (priorité aux détails techniques)',
            itemLabel: (props) => props.value?.filename || 'Image',
          }
        ),
        description_technique: fields.markdoc({ label: 'Commentaires sur l’état et l’histoire du modèle' }),
      },
    }),
  },
});