# Dependency graph

```mermaid
flowchart LR

    internal-users>Internal users]
    external-users>External users]


    subgraph dinesykmeldte-backend-parent[dinesykmeldte-backend]
    direction TB
    dinesykmeldte-backend-app[dinesykmeldte-backend]
    dinesykmeldte-backend-dinesykmeldte-backend-db-instance[("dinesykmeldte-backend")]
    dinesykmeldte-backend-app --> dinesykmeldte-backend-dinesykmeldte-backend-db-instance

    end

    subgraph sykmeldinger-backend-kafka-parent[sykmeldinger-backend-kafka]
    direction TB
    sykmeldinger-backend-kafka-app[sykmeldinger-backend-kafka]


    end

    subgraph syfosmmanuell-backend-parent[syfosmmanuell-backend]
    direction TB
    syfosmmanuell-backend-app[syfosmmanuell-backend]
    syfosmmanuell-backend-syfosmmanuell-backend-instance[("syfosmmanuell-backend")]
    syfosmmanuell-backend-app --> syfosmmanuell-backend-syfosmmanuell-backend-instance

    end

    subgraph syfosmvarsel-parent[syfosmvarsel]
    direction TB
    syfosmvarsel-app[syfosmvarsel]
    syfosmvarsel-smvarsel-instance[("smvarsel")]
    syfosmvarsel-app --> syfosmvarsel-smvarsel-instance

    end

    subgraph syfosmoppgave-parent[syfosmoppgave]
    direction TB
    syfosmoppgave-app[syfosmoppgave]


    end

    subgraph smregistrering-parent[smregistrering]
    direction TB
    smregistrering-app[smregistrering]


    smregistrering-azure-sidecar[azure sidecar]
    smregistrering-azure-sidecar --> smregistrering-app

    end

    subgraph syfosmpapirmottak-parent[syfosmpapirmottak]
    direction TB
    syfosmpapirmottak-app[syfosmpapirmottak]


    end

    subgraph syfosmmottak-parent[syfosmmottak]
    direction TB
    syfosmmottak-app[syfosmmottak]
    syfosmmottak-syfosmmottak-instance[("syfosmmottak")]
    syfosmmottak-app --> syfosmmottak-syfosmmottak-instance

    end

    subgraph macgyver-frontend-parent[macgyver-frontend]
    direction TB
    macgyver-frontend-app[macgyver-frontend]


    macgyver-frontend-azure-sidecar[azure sidecar]
    macgyver-frontend-azure-sidecar --> macgyver-frontend-app

    end

    subgraph syfosmoppgave-stream-parent[syfosmoppgave-stream]
    direction TB
    syfosmoppgave-stream-app[syfosmoppgave-stream]


    end

    subgraph pale-2-regler-parent[pale-2-regler]
    direction TB
    pale-2-regler-app[pale-2-regler]


    end

    subgraph teamsykmelding-pik-2-parent[teamsykmelding-pik-2]
    direction TB
    teamsykmelding-pik-2-app[teamsykmelding-pik-2]


    end

    subgraph syfonlaltinn-parent[syfonlaltinn]
    direction TB
    syfonlaltinn-app[syfonlaltinn]
    syfonlaltinn-syfonlaltinn[("syfonlaltinn")]
    syfonlaltinn-app --> syfonlaltinn-syfonlaltinn

    end

    subgraph smarbeidsgiver-pdfgen-parent[smarbeidsgiver-pdfgen]
    direction TB
    smarbeidsgiver-pdfgen-app[smarbeidsgiver-pdfgen]


    end

    subgraph narmesteleder-parent[narmesteleder]
    direction TB
    narmesteleder-app[narmesteleder]
    narmesteleder-narmesteleder-db-instance[("narmesteleder")]
    narmesteleder-app --> narmesteleder-narmesteleder-db-instance

    end

    subgraph teamsykmelding-website-parent[teamsykmelding-website]
    direction TB
    teamsykmelding-website-app[teamsykmelding-website]


    end

    subgraph pale-2-pdfgen-parent[pale-2-pdfgen]
    direction TB
    pale-2-pdfgen-app[pale-2-pdfgen]


    end

    subgraph macgyver-parent[macgyver]
    direction TB
    macgyver-app[macgyver]


    end

    subgraph helsesjekk-bot-parent[helsesjekk-bot]
    direction TB
    helsesjekk-bot-app[helsesjekk-bot]
    helsesjekk-bot-helsesjekk-bot[("helsesjekk-bot")]
    helsesjekk-bot-app --> helsesjekk-bot-helsesjekk-bot

    end

    subgraph sparenaproxy-parent[sparenaproxy]
    direction TB
    sparenaproxy-app[sparenaproxy]
    sparenaproxy-sparenaproxy-db-instance[("sparenaproxy")]
    sparenaproxy-app --> sparenaproxy-sparenaproxy-db-instance

    end

    subgraph narmesteleder-varsel-parent[narmesteleder-varsel]
    direction TB
    narmesteleder-varsel-app[narmesteleder-varsel]
    narmesteleder-varsel-narmesteleder-varsel-db-instance[("narmesteleder-varsel")]
    narmesteleder-varsel-app --> narmesteleder-varsel-narmesteleder-varsel-db-instance

    end

    subgraph syfosmsak-stream-parent[syfosmsak-stream]
    direction TB
    syfosmsak-stream-app[syfosmsak-stream]


    end

    subgraph pale-2-register-parent[pale-2-register]
    direction TB
    pale-2-register-app[pale-2-register]
    pale-2-register-pale-2-register-instance[("pale-2-register")]
    pale-2-register-app --> pale-2-register-pale-2-register-instance

    end

    subgraph syk-dig-backend-parent[syk-dig-backend]
    direction TB
    syk-dig-backend-app[syk-dig-backend]
    syk-dig-backend-syk-dig-backend-db-instance[("syk-dig-backend")]
    syk-dig-backend-app --> syk-dig-backend-syk-dig-backend-db-instance

    end

    subgraph syfosmapprec-parent[syfosmapprec]
    direction TB
    syfosmapprec-app[syfosmapprec]


    end

    subgraph pale-2-parent[pale-2]
    direction TB
    pale-2-app[pale-2]
    pale-2-pale-2-instance[("pale-2")]
    pale-2-app --> pale-2-pale-2-instance

    end

    subgraph sykmeldinger-parent[sykmeldinger]
    direction TB
    sykmeldinger-app[sykmeldinger]


    sykmeldinger-idporten-sidecar[idporten sidecar]
    sykmeldinger-idporten-sidecar --> sykmeldinger-app

    end

    subgraph syfosmpapirregler-parent[syfosmpapirregler]
    direction TB
    syfosmpapirregler-app[syfosmpapirregler]


    end

    subgraph dinesykmeldte-parent[dinesykmeldte]
    direction TB
    dinesykmeldte-app[dinesykmeldte]


    dinesykmeldte-idporten-sidecar[idporten sidecar]
    dinesykmeldte-idporten-sidecar --> dinesykmeldte-app

    end

    subgraph syfosmarena-parent[syfosmarena]
    direction TB
    syfosmarena-app[syfosmarena]


    end

    subgraph syfosmregister-parent[syfosmregister]
    direction TB
    syfosmregister-app[syfosmregister]
    syfosmregister-smregister-instance[("smregister")]
    syfosmregister-app --> syfosmregister-smregister-instance

    end

    subgraph syk-dig-oppgavelytter-parent[syk-dig-oppgavelytter]
    direction TB
    syk-dig-oppgavelytter-app[syk-dig-oppgavelytter]


    end

    subgraph smpdfgen-parent[smpdfgen]
    direction TB
    smpdfgen-app[smpdfgen]


    end

    subgraph pale-2-sak-parent[pale-2-sak]
    direction TB
    pale-2-sak-app[pale-2-sak]


    end

    subgraph narmesteleder-arbeidsforhold-parent[narmesteleder-arbeidsforhold]
    direction TB
    narmesteleder-arbeidsforhold-app[narmesteleder-arbeidsforhold]
    narmesteleder-arbeidsforhold-narmesteleder-arbeidsforhold-db-instance[("narmesteleder-arbeidsforhold")]
    narmesteleder-arbeidsforhold-app --> narmesteleder-arbeidsforhold-narmesteleder-arbeidsforhold-db-instance

    end

    subgraph syfosminfotrygd-parent[syfosminfotrygd]
    direction TB
    syfosminfotrygd-app[syfosminfotrygd]


    end

    subgraph syfosmmanuell-parent[syfosmmanuell]
    direction TB
    syfosmmanuell-app[syfosmmanuell]


    syfosmmanuell-azure-sidecar[azure sidecar]
    syfosmmanuell-azure-sidecar --> syfosmmanuell-app

    end

    subgraph dinesykmeldte-kafka-parent[dinesykmeldte-kafka]
    direction TB
    dinesykmeldte-kafka-app[dinesykmeldte-kafka]


    end

    subgraph sykmeldinger-backend-parent[sykmeldinger-backend]
    direction TB
    sykmeldinger-backend-app[sykmeldinger-backend]
    sykmeldinger-backend-sykmeldinger-db-instance[("sykmeldinger")]
    sykmeldinger-backend-app --> sykmeldinger-backend-sykmeldinger-db-instance

    end

    subgraph syfosmregler-parent[syfosmregler]
    direction TB
    syfosmregler-app[syfosmregler]


    end

    subgraph sykmeldinger-arbeidsgiver-parent[sykmeldinger-arbeidsgiver]
    direction TB
    sykmeldinger-arbeidsgiver-app[sykmeldinger-arbeidsgiver]
    sykmeldinger-arbeidsgiver-sykmeldinger-arbeidsgiver-instance[("sykmeldinger-arbeidsgiver")]
    sykmeldinger-arbeidsgiver-app --> sykmeldinger-arbeidsgiver-sykmeldinger-arbeidsgiver-instance

    end

    subgraph smtss-parent[smtss]
    direction TB
    smtss-app[smtss]


    end

    subgraph syfosmaltinn-parent[syfosmaltinn]
    direction TB
    syfosmaltinn-app[syfosmaltinn]
    syfosmaltinn-syfosmaltinn[("syfosmaltinn")]
    syfosmaltinn-app --> syfosmaltinn-syfosmaltinn

    end

    subgraph smregistrering-backend-parent[smregistrering-backend]
    direction TB
    smregistrering-backend-app[smregistrering-backend]
    smregistrering-backend-smregistrering-instance[("smregistrering")]
    smregistrering-backend-app --> smregistrering-backend-smregistrering-instance

    end

    subgraph syk-dig-parent[syk-dig]
    direction TB
    syk-dig-app[syk-dig]


    syk-dig-azure-sidecar[azure sidecar]
    syk-dig-azure-sidecar --> syk-dig-app

    end

    subgraph syfosmarena-stream-parent[syfosmarena-stream]
    direction TB
    syfosmarena-stream-app[syfosmarena-stream]


    end

    subgraph syfosmsak-parent[syfosmsak]
    direction TB
    syfosmsak-app[syfosmsak]


    end
    subgraph topics
    direction TB

    omrade-helse-etterlevelse-topic[omrade-helse-etterlevelse]


    dinesykmeldte-hendelser-topic[dinesykmeldte-hendelser]


    dinesykmeldte-hendelser-v2-topic[dinesykmeldte-hendelser-v2]


    privat-aktiver-planlagtmelding-topic[privat-aktiver-planlagtmelding]


    syfo-nl-request-topic[syfo-nl-request]


    syfo-nl-invalid-topic[syfo-nl-invalid]


    syfo-narmesteleder-topic[syfo-narmesteleder]


    syfo-narmesteleder-leesah-topic[syfo-narmesteleder-leesah]


    macgyver-sykmelding-endringslogg-topic[macgyver-sykmelding-endringslogg]


    gamle-sykmeldinger-id-topic[gamle-sykmeldinger-id]


    syfo-sendt-sykmelding-topic[syfo-sendt-sykmelding]


    syfo-bekreftet-sykmelding-topic[syfo-bekreftet-sykmelding]


    syfo-mottatt-sykmelding-topic[syfo-mottatt-sykmelding]


    avvist-sykmelding-topic[avvist-sykmelding]


    manuell-behandling-sykmelding-topic[manuell-behandling-sykmelding]


    ok-sykmelding-topic[ok-sykmelding]


    oppgave-journal-opprettet-topic[oppgave-journal-opprettet]


    oppgave-produser-oppgave-topic[oppgave-produser-oppgave]


    papir-sm-registering-topic[papir-sm-registering]


    privat-arena-input-topic[privat-arena-input]


    privat-registrer-oppgave-topic[privat-registrer-oppgave]


    privat-oppgave-retry-topic[privat-oppgave-retry]


    privat-sminfotrygd-retry-topic[privat-sminfotrygd-retry]


    privat-sykmelding-sak-topic[privat-sykmelding-sak]


    syfoservice-mq-topic[syfoservice-mq]


    sykmelding-apprec-topic[sykmelding-apprec]


    sykmelding-behandlingsutfall-topic[sykmelding-behandlingsutfall]


    sykmelding-manuell-topic[sykmelding-manuell]


    sykmeldingstatus-leesah-topic[sykmeldingstatus-leesah]


    sykmelding-historisk-topic[sykmelding-historisk]


    paragraf-i-kode-topic[paragraf-i-kode]


    syk-dig-oppgave-topic[syk-dig-oppgave]


    gamle-sykmeldinger-topic[gamle-sykmeldinger]


    legeerklaering-topic[legeerklaering]

    end
        internal-users --> smregistrering-azure-sidecar
        internal-users --> macgyver-frontend-azure-sidecar
        internal-users --> narmesteleder-app
        internal-users --> teamsykmelding-website-app
        internal-users --> helsesjekk-bot-app
        internal-users --> narmesteleder-varsel-app
        internal-users --> syk-dig-backend-app
        external-users --> sykmeldinger-idporten-sidecar
        external-users --> dinesykmeldte-idporten-sidecar
        internal-users --> syfosmregister-app
        internal-users --> syfosmmanuell-azure-sidecar
        external-users --> sykmeldinger-backend-app
        external-users --> sykmeldinger-arbeidsgiver-app
        internal-users --> syk-dig-azure-sidecar

    syfosmmanuell-backend-app --> syfo-tilgangskontroll-app


    smregistrering-app --> smregistrering-backend-app


    syfosmpapirmottak-app --> syfosmpapirregler-app
    syfosmpapirmottak-app --> smtss-app


    syfosmmottak-app --> syfosmregler-app
    syfosmmottak-app --> clamav-app
    syfosmmottak-app --> smtss-app


    macgyver-frontend-app --> macgyver-app


    macgyver-app --> narmesteleder-app


    sparenaproxy-app --> syfosmregister-app
    sparenaproxy-app --> flex-syketilfelle-app


    syk-dig-backend-app --> syfo-tilgangskontroll-app


    pale-2-app --> pale-2-regler-app
    pale-2-app --> clamav-app
    pale-2-app --> smtss-app


    sykmeldinger-app --> sykmeldinger-backend-app
    sykmeldinger-app --> flex-syketilfelle-app
    sykmeldinger-app --> nav-dekoratoren-app


    syfosmpapirregler-app --> syfosmregister-app
    syfosmpapirregler-app --> flex-syketilfelle-app


    dinesykmeldte-app --> dinesykmeldte-backend-app
    dinesykmeldte-app --> nav-dekoratoren-app


    syfosmarena-app --> smtss-app


    syfosmregister-app --> syfo-tilgangskontroll-app


    pale-2-sak-app --> pale-2-pdfgen-app


    syfosminfotrygd-app --> syfosmmanuell-backend-app
    syfosminfotrygd-app --> syfosmregister-app
    syfosminfotrygd-app --> flex-syketilfelle-app


    syfosmmanuell-app --> syfosmmanuell-backend-app


    dinesykmeldte-kafka-app --> flex-syketilfelle-app


    syfosmregler-app --> syfosmregister-app
    syfosmregler-app --> flex-syketilfelle-app


    sykmeldinger-arbeidsgiver-app --> narmesteleder-app


    syfosmaltinn-app --> smarbeidsgiver-pdfgen-app


    smregistrering-backend-app --> syfosmregister-app
    smregistrering-backend-app --> syfosmpapirregler-app
    smregistrering-backend-app --> smtss-app
    smregistrering-backend-app --> syfo-tilgangskontroll-app


    syk-dig-app --> syk-dig-backend-app


    syfosmsak-app --> smpdfgen-app


    omrade-helse-etterlevelse-topic --> spydig-app
    spydig-app --> omrade-helse-etterlevelse-topic

    dinesykmeldte-hendelser-topic --> dinesykmeldte-backend-app
    dinesykmeldte-hendelser-topic --> dinesykmeldte-kafka-app
    dinesykmeldte-backend-app --> dinesykmeldte-hendelser-topic
    dinesykmeldte-kafka-app --> dinesykmeldte-hendelser-topic

    dinesykmeldte-hendelser-v2-topic --> dinesykmeldte-backend-app
    dinesykmeldte-hendelser-v2-topic --> dinesykmeldte-kafka-app
    dinesykmeldte-backend-app --> dinesykmeldte-hendelser-v2-topic
    dinesykmeldte-kafka-app --> dinesykmeldte-hendelser-v2-topic

    privat-aktiver-planlagtmelding-topic --> sparenaproxy-app
    sparenaproxy-app --> privat-aktiver-planlagtmelding-topic

    syfo-nl-request-topic --> syfonlaltinn-app
    syfonlaltinn-app --> syfo-nl-request-topic

    syfo-nl-invalid-topic --> syfonlaltinn-app
    syfonlaltinn-app --> syfo-nl-invalid-topic

    syfo-narmesteleder-topic --> syfosmaltinn-app
    syfo-narmesteleder-topic --> syfoservicestrangler-app
    syfo-narmesteleder-topic --> narmesteleder-app
    syfosmaltinn-app --> syfo-narmesteleder-topic
    syfoservicestrangler-app --> syfo-narmesteleder-topic
    narmesteleder-app --> syfo-narmesteleder-topic

    syfo-narmesteleder-leesah-topic --> narmesteleder-app
    syfo-narmesteleder-leesah-topic --> narmesteleder-varsel-app
    syfo-narmesteleder-leesah-topic --> sykepengesoknad-narmesteleder-varsler-app
    syfo-narmesteleder-leesah-topic --> sykepengesoknad-ikke-sendt-altinnvarsel-app
    syfo-narmesteleder-leesah-topic --> sykepengesoknad-backend-app
    syfo-narmesteleder-leesah-topic --> narmesteleder-arbeidsforhold-app
    syfo-narmesteleder-leesah-topic --> isnarmesteleder-app
    syfo-narmesteleder-leesah-topic --> dinesykmeldte-backend-app
    syfo-narmesteleder-leesah-topic --> sykmeldinger-arbeidsgiver-app
    syfo-narmesteleder-leesah-topic --> notifikasjon-bruker-api-writer-app
    syfo-narmesteleder-leesah-topic --> syfosmaltinn-app
    syfo-narmesteleder-leesah-topic --> min-side-arbeidsgiver-api-app
    syfo-narmesteleder-leesah-topic --> dinesykmeldte-kafka-app
    syfo-narmesteleder-leesah-topic --> sykmeldinger-backend-kafka-app
    narmesteleder-app --> syfo-narmesteleder-leesah-topic
    narmesteleder-varsel-app --> syfo-narmesteleder-leesah-topic
    sykepengesoknad-narmesteleder-varsler-app --> syfo-narmesteleder-leesah-topic
    sykepengesoknad-ikke-sendt-altinnvarsel-app --> syfo-narmesteleder-leesah-topic
    sykepengesoknad-backend-app --> syfo-narmesteleder-leesah-topic
    narmesteleder-arbeidsforhold-app --> syfo-narmesteleder-leesah-topic
    isnarmesteleder-app --> syfo-narmesteleder-leesah-topic
    dinesykmeldte-backend-app --> syfo-narmesteleder-leesah-topic
    sykmeldinger-arbeidsgiver-app --> syfo-narmesteleder-leesah-topic
    notifikasjon-bruker-api-writer-app --> syfo-narmesteleder-leesah-topic
    syfosmaltinn-app --> syfo-narmesteleder-leesah-topic
    min-side-arbeidsgiver-api-app --> syfo-narmesteleder-leesah-topic
    dinesykmeldte-kafka-app --> syfo-narmesteleder-leesah-topic
    sykmeldinger-backend-kafka-app --> syfo-narmesteleder-leesah-topic

    macgyver-sykmelding-endringslogg-topic --> macgyver-app
    macgyver-app --> macgyver-sykmelding-endringslogg-topic

    gamle-sykmeldinger-id-topic --> macgyver-app
    macgyver-app --> gamle-sykmeldinger-id-topic

    syfo-sendt-sykmelding-topic --> syfosmaltinn-app
    syfo-sendt-sykmelding-topic --> narmesteleder-varsel-app
    syfo-sendt-sykmelding-topic --> sykmeldinger-arbeidsgiver-app
    syfo-sendt-sykmelding-topic --> sykepengesoknad-backend-app
    syfo-sendt-sykmelding-topic --> flex-syketilfelle-app
    syfo-sendt-sykmelding-topic --> sykepengesoknad-altinn-app
    syfo-sendt-sykmelding-topic --> dinesykmeldte-backend-app
    syfo-sendt-sykmelding-topic --> macgyver-app
    syfo-sendt-sykmelding-topic --> dinesykmeldte-kafka-app
    syfo-sendt-sykmelding-topic --> min-side-arbeidsgiver-api-app
    syfo-sendt-sykmelding-topic --> sykmeldinger-backend-kafka-app
    syfosmaltinn-app --> syfo-sendt-sykmelding-topic
    narmesteleder-varsel-app --> syfo-sendt-sykmelding-topic
    sykmeldinger-arbeidsgiver-app --> syfo-sendt-sykmelding-topic
    sykepengesoknad-backend-app --> syfo-sendt-sykmelding-topic
    flex-syketilfelle-app --> syfo-sendt-sykmelding-topic
    sykepengesoknad-altinn-app --> syfo-sendt-sykmelding-topic
    dinesykmeldte-backend-app --> syfo-sendt-sykmelding-topic
    macgyver-app --> syfo-sendt-sykmelding-topic
    dinesykmeldte-kafka-app --> syfo-sendt-sykmelding-topic
    min-side-arbeidsgiver-api-app --> syfo-sendt-sykmelding-topic
    sykmeldinger-backend-kafka-app --> syfo-sendt-sykmelding-topic

    syfo-bekreftet-sykmelding-topic --> sykepengesoknad-backend-app
    syfo-bekreftet-sykmelding-topic --> flex-syketilfelle-app
    syfo-bekreftet-sykmelding-topic --> macgyver-app
    syfo-bekreftet-sykmelding-topic --> sykmeldinger-backend-kafka-app
    sykepengesoknad-backend-app --> syfo-bekreftet-sykmelding-topic
    flex-syketilfelle-app --> syfo-bekreftet-sykmelding-topic
    macgyver-app --> syfo-bekreftet-sykmelding-topic
    sykmeldinger-backend-kafka-app --> syfo-bekreftet-sykmelding-topic

    syfo-mottatt-sykmelding-topic --> flex-syketilfelle-app
    syfo-mottatt-sykmelding-topic --> macgyver-app
    flex-syketilfelle-app --> syfo-mottatt-sykmelding-topic
    macgyver-app --> syfo-mottatt-sykmelding-topic

    avvist-sykmelding-topic --> syfosmregister-app
    avvist-sykmelding-topic --> syfosmvarsel-app
    avvist-sykmelding-topic --> syfosmsak-stream-app
    avvist-sykmelding-topic --> sykmeldinger-backend-kafka-app
    avvist-sykmelding-topic --> k143566-app
    syfosmregister-app --> avvist-sykmelding-topic
    syfosmvarsel-app --> avvist-sykmelding-topic
    syfosmsak-stream-app --> avvist-sykmelding-topic
    sykmeldinger-backend-kafka-app --> avvist-sykmelding-topic
    k143566-app --> avvist-sykmelding-topic

    manuell-behandling-sykmelding-topic --> syfosmregister-app
    manuell-behandling-sykmelding-topic --> syfosmvarsel-app
    manuell-behandling-sykmelding-topic --> syfosmsak-stream-app
    manuell-behandling-sykmelding-topic --> syfosmarena-stream-app
    manuell-behandling-sykmelding-topic --> sparenaproxy-app
    manuell-behandling-sykmelding-topic --> dvh-sykm-konsument-app
    manuell-behandling-sykmelding-topic --> isdialogmelding-app
    manuell-behandling-sykmelding-topic --> sykmeldinger-backend-kafka-app
    manuell-behandling-sykmelding-topic --> dvh-sykefravar-airflow-kafka-app
    manuell-behandling-sykmelding-topic --> sykepengesoknad-backend-app
    syfosmregister-app --> manuell-behandling-sykmelding-topic
    syfosmvarsel-app --> manuell-behandling-sykmelding-topic
    syfosmsak-stream-app --> manuell-behandling-sykmelding-topic
    syfosmarena-stream-app --> manuell-behandling-sykmelding-topic
    sparenaproxy-app --> manuell-behandling-sykmelding-topic
    dvh-sykm-konsument-app --> manuell-behandling-sykmelding-topic
    isdialogmelding-app --> manuell-behandling-sykmelding-topic
    sykmeldinger-backend-kafka-app --> manuell-behandling-sykmelding-topic
    dvh-sykefravar-airflow-kafka-app --> manuell-behandling-sykmelding-topic
    sykepengesoknad-backend-app --> manuell-behandling-sykmelding-topic

    ok-sykmelding-topic --> syfosmregister-app
    ok-sykmelding-topic --> syfosmvarsel-app
    ok-sykmelding-topic --> syfosmsak-stream-app
    ok-sykmelding-topic --> syfosminfotrygd-app
    ok-sykmelding-topic --> syfosmarena-stream-app
    ok-sykmelding-topic --> sparenaproxy-app
    ok-sykmelding-topic --> dvh-sykm-konsument-app
    ok-sykmelding-topic --> isdialogmelding-app
    ok-sykmelding-topic --> sykmeldinger-backend-kafka-app
    ok-sykmelding-topic --> k143566-app
    ok-sykmelding-topic --> dvh-sykefravar-airflow-kafka-app
    ok-sykmelding-topic --> sykepengesoknad-backend-app
    syfosmregister-app --> ok-sykmelding-topic
    syfosmvarsel-app --> ok-sykmelding-topic
    syfosmsak-stream-app --> ok-sykmelding-topic
    syfosminfotrygd-app --> ok-sykmelding-topic
    syfosmarena-stream-app --> ok-sykmelding-topic
    sparenaproxy-app --> ok-sykmelding-topic
    dvh-sykm-konsument-app --> ok-sykmelding-topic
    isdialogmelding-app --> ok-sykmelding-topic
    sykmeldinger-backend-kafka-app --> ok-sykmelding-topic
    k143566-app --> ok-sykmelding-topic
    dvh-sykefravar-airflow-kafka-app --> ok-sykmelding-topic
    sykepengesoknad-backend-app --> ok-sykmelding-topic

    oppgave-journal-opprettet-topic --> syfosmarena-stream-app
    oppgave-journal-opprettet-topic --> syfosmoppgave-stream-app
    syfosmarena-stream-app --> oppgave-journal-opprettet-topic
    syfosmoppgave-stream-app --> oppgave-journal-opprettet-topic

    oppgave-produser-oppgave-topic --> syfosmoppgave-stream-app
    syfosmoppgave-stream-app --> oppgave-produser-oppgave-topic

    papir-sm-registering-topic --> smregistrering-backend-app
    smregistrering-backend-app --> papir-sm-registering-topic

    privat-arena-input-topic --> syfosmarena-app
    privat-arena-input-topic --> syfosmarena-stream-app
    syfosmarena-app --> privat-arena-input-topic
    syfosmarena-stream-app --> privat-arena-input-topic

    privat-registrer-oppgave-topic --> syfosmoppgave-app
    syfosmoppgave-app --> privat-registrer-oppgave-topic

    privat-oppgave-retry-topic --> syfosmoppgave-app
    syfosmoppgave-app --> privat-oppgave-retry-topic

    privat-sminfotrygd-retry-topic --> syfosminfotrygd-app
    syfosminfotrygd-app --> privat-sminfotrygd-retry-topic

    privat-sykmelding-sak-topic --> syfosmsak-app
    privat-sykmelding-sak-topic --> syfosmsak-stream-app
    syfosmsak-app --> privat-sykmelding-sak-topic
    syfosmsak-stream-app --> privat-sykmelding-sak-topic

    syfoservice-mq-topic --> syfoservice-mq-producer-app
    syfoservice-mq-producer-app --> syfoservice-mq-topic

    sykmelding-apprec-topic --> syfosmapprec-app
    syfosmapprec-app --> sykmelding-apprec-topic

    sykmelding-behandlingsutfall-topic --> syfosmregister-app
    sykmelding-behandlingsutfall-topic --> syfosmsak-stream-app
    sykmelding-behandlingsutfall-topic --> sykmeldinger-backend-kafka-app
    syfosmregister-app --> sykmelding-behandlingsutfall-topic
    syfosmsak-stream-app --> sykmelding-behandlingsutfall-topic
    sykmeldinger-backend-kafka-app --> sykmelding-behandlingsutfall-topic

    sykmelding-manuell-topic --> syfosmmanuell-backend-app
    syfosmmanuell-backend-app --> sykmelding-manuell-topic

    sykmeldingstatus-leesah-topic --> syfosmregister-app
    sykmeldingstatus-leesah-topic --> syfosmvarsel-app
    sykmeldingstatus-leesah-topic --> macgyver-app
    sykmeldingstatus-leesah-topic --> sykmeldinger-backend-kafka-app
    sykmeldingstatus-leesah-topic --> isoppfolgingstilfelle-app
    syfosmregister-app --> sykmeldingstatus-leesah-topic
    syfosmvarsel-app --> sykmeldingstatus-leesah-topic
    macgyver-app --> sykmeldingstatus-leesah-topic
    sykmeldinger-backend-kafka-app --> sykmeldingstatus-leesah-topic
    isoppfolgingstilfelle-app --> sykmeldingstatus-leesah-topic

    sykmelding-historisk-topic --> macgyver-app
    sykmelding-historisk-topic --> sykmeldinger-backend-kafka-app
    macgyver-app --> sykmelding-historisk-topic
    sykmeldinger-backend-kafka-app --> sykmelding-historisk-topic

    paragraf-i-kode-topic --> teamsykmelding-pik-app
    paragraf-i-kode-topic --> teamsykmelding-pik-2-app
    teamsykmelding-pik-app --> paragraf-i-kode-topic
    teamsykmelding-pik-2-app --> paragraf-i-kode-topic

    syk-dig-oppgave-topic --> syk-dig-backend-app
    syk-dig-backend-app --> syk-dig-oppgave-topic

    gamle-sykmeldinger-topic --> macgyver-app
    gamle-sykmeldinger-topic --> sykmeldinger-backend-kafka-app
    macgyver-app --> gamle-sykmeldinger-topic
    sykmeldinger-backend-kafka-app --> gamle-sykmeldinger-topic

    legeerklaering-topic --> macgyver-app
    legeerklaering-topic --> pale-2-sak-app
    legeerklaering-topic --> pale-2-register-app
    legeerklaering-topic --> k143566-app
    legeerklaering-topic --> isbehandlerdialog-app
    macgyver-app --> legeerklaering-topic
    pale-2-sak-app --> legeerklaering-topic
    pale-2-register-app --> legeerklaering-topic
    k143566-app --> legeerklaering-topic
    isbehandlerdialog-app --> legeerklaering-topic

```
